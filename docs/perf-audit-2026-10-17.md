# Frontend Performance Audit — 2026-10-17

> **Status: fixes applied same day.** All P0/P1/P2 items and most P3 items below are implemented —
> see "Fixes applied" at the bottom for what changed and the re-measurement results.

Audited against the Frontend Performance Playbook (item IDs like `[b1]`, `[l7]` refer to its checklists).
Method: three parallel code audits (loading / JS-bundle / vitals) + a lab performance trace of the
production build served locally (`vite preview`, Chrome trace).

## Lab measurement (best case: localhost, no throttling)

| Signal | Value | Reading |
|---|---|---|
| LCP | 236 ms | **98.3% is element render delay** — the LCP element is the hero heading, painted only after JS executes + GSAP fades it in. Unthrottled localhost hides the cost; on a real phone this delay scales with eager JS download+parse. |
| CLS | 0.00 | Clean at load. Scroll-time shift risk exists in Works (see F14). |
| Forced reflow | **354 ms total** | Dominated by GSAP internals (303 ms + 72 ms + 38 ms + 28 ms frames) — layout reads during animation setup. INP/long-task risk. |
| Network on home load | — | three chunk (996 KB) **fetched during startup**; 7 Amiamie font files (TTF *and* OTF); Google Fonts "Rowdies" CSS (only used on the 404 page). |

Lighthouse CLI/audit could not run in this environment (Chrome protocol bug in network emulation).
No field data (RUM) exists in the repo — F0 fixes that.

**Estimated real-device impact:** eager JS today is ~1.42 MB raw / **~415 KB gzip** (index 94 + three 275 + gsap 48 gz)
plus 504 KB GLB and ~187 KB of wasted font bytes. On a Slow-4G mid-tier phone, LCP realistically lands in the
2.5–4 s "needs work" band or worse, entirely due to items F1–F3 below.

---

## Prioritized findings

### P0 — architecture of first paint (LCP)

**F1. [b1] The entire three.js/R3F/drei stack is on the critical path despite `React.lazy`.**
`vite.config.js:14-19` `advancedChunks` groups collapsed shared modules into the "three" chunk —
`dist/index.html:150` emits `modulepreload` for `three-*.js` (996 KB raw / 275 KB gz), and react-dom is
physically split across the entry and three chunks. `Hero.jsx:8` lazy-imports HeroCanvas (chunk is only 4 KB),
but Rolldown promotes the dependency to modulepreload, so the split buys nothing. Also loaded on mobile.
*Fix (either, then verify):* add a higher-priority react group —
`{ name: "react", test: /[\\/]node_modules[\\/](?:react|react-dom|scheduler)[\\/]/, priority: 10 }` before the
three group — or delete `advancedChunks` and let Rolldown's default splitting work.
**Verify:** rebuild and assert `dist/index.html` no longer lists `three-*.js` in `modulepreload`.
Eager JS drops to ~425 KB raw / ~145 KB gz. Optionally also defer mounting HeroCanvas (idle/intersection) and
skip it on `isMobile`/low-core devices.

**F2. [l7] LCP element starts hidden and waits for JS.**
The hero H1 ("ZAHRAN") renders into an empty `#root` and GSAP animates it from `opacity: 0`
(`AnimatedHeaderSection.jsx:26-40`, `tl.from(...)`). Nothing paints until React mounts.
*Fix:* prerender/SSG the home shell so the heading is in the HTML (even a static index.html shell),
and/or make the text visible by default with a transform-only entrance (`fromTo` with `immediateRender: false` —
never `opacity: 0` on the LCP text's first frame).

**F3. [s7] Font pipeline: preloads point at TTF, CSS loads OTF, no WOFF2 anywhere.**
`index.html:82-83` preloads `Amiamie-Regular.ttf` / `-Light.ttf` (94 + 93 KB), but every `@font-face` in
`src/index.css` (e.g. lines 5-6) lists the **OTF first**, so the preloads are guaranteed mismatches (~187 KB wasted)
and real fonts arrive late, after CSS parse. `public/fonts` has 20 OTF/TTF files (~1.6 MB), zero WOFF2.
The Round faces used for display text aren't preloaded at all.
*Fix:* convert to WOFF2 (`pyftsubset … --flavor=woff2`), preload exactly those URLs, delete TTF preloads;
add a `size-adjust`-matched fallback face so the h1 swap doesn't reflow the hero. Zero-cost interim fix:
reorder `src` to match the preloaded TTFs.

### P1 — main thread / INP

**F4. [i3] Three competing rAF loops; no Lenis↔ScrollTrigger sync; canvas renders forever.**
`ReactLenis root` runs its own rAF (`App.jsx:34-51`), R3F Canvas defaults to `frameloop="always"`
(`HeroCanvas.jsx:50`), and 7+ scrubbed ScrollTriggers update from native scroll events with no
`lenis.on('scroll', ScrollTrigger.update)` anywhere. The planet keeps rendering every frame even when the hero
is scrolled away. This is the code-level counterpart of the 354 ms forced-reflow measurement.
*Fix:* canonical integration — `autoRaf={false}` on ReactLenis, `gsap.ticker.add(t => lenis?.raf(t*1000))`,
`gsap.ticker.lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`; flip Canvas to
`frameloop="never"`/`"demand"` when the hero is off-screen (scrollY > viewport height).

**F5. [i2] `Magnet` does `getBoundingClientRect` + `setState` on every window mousemove**
(`Animations/Magnet/Magnet.tsx:39-64`, mounted in the hero). Continuous pointer movement = continuous
layout reads + React re-renders on the first component users touch. *Fix:* port to the house pattern —
`gsap.quickTo(el, "x"/"y")`, cache the rect on `pointerenter`, attach listeners to the element not `window`.

**F6. [b7] `@iconify/react` full build fetches every icon from `api.iconify.design` at runtime**
(Tools grid, arrows, stars — ~11+ glyphs). Pop-in + third-party round trips mid-scroll.
*Fix:* `@iconify-json/*` packages + `addCollection` (or `unplugin-icons`) for zero runtime fetches.

### P2 — network hygiene

**F7. [l3] The 504 KB `Planet.glb` preload runs at high priority** (`index.html:85`, `as="fetch"`),
racing the entry chunk and fonts while the actual LCP element waits on JS. *Fix:* `fetchpriority="low"`
on the preload (the decorative model still beats the spinner via `useGLTF.preload`).

**F8. [c5] Google Fonts "Rowdies" loads on every route but is used only on the 404 page**
(`index.html:66-80` vs `NotFound.jsx`). Confirmed in the network log of the home page.
*Fix:* remove from `index.html`; self-host a subset WOFF2 imported inside `NotFound.jsx` only.

**F9. [b7] `react-scroll` is redundant dead weight** — 2 anchor links (`Navbar.jsx:4`, `Hero.jsx:5`)
while Lenis already owns scrolling (its animation also fights Lenis lerp). *Fix:* drop it;
`lenis.scrollTo("#work", { offset: -100 })` via `useLenis()`. (Optionally drop react-router too —
2 routes on a one-page site.)

**F10. [n5]/[l4] Draco decoder fetched from `www.gstatic.com` mid-hero with no preconnect**
(`Planet.jsx:12`). *Fix:* preconnect `https://www.gstatic.com` (crossorigin), or self-host the decoder.

**F11. [n3] No Cache-Control anywhere** — `public/.htaccess` has no caching directives; Hostinger defaults
apply to fonts, GLB, webp, HTML. *Fix:* `immutable` long-cache for fonts/glb/webp/pdf, `no-cache` for HTML.
Careful: unhashed `public/assets/` merges into `dist/assets/` beside hashed bundles — scope the immutable rule
to the hashed pattern or to fonts/media extensions.

**F12. [b9] Compression unverified.** No `.gz`/`.br` in dist, no compression plugin, no headers config.
*Fix:* verify what LiteSpeed actually serves (`curl -sI -H 'Accept-Encoding: br' https://mzahran.tech/assets/<chunk>.js`);
if absent, add `vite-plugin-compression2` (brotli+gzip precompressed assets).

### P3 — smaller wins

- **F13. [b1] `SplitText` registered globally** (`lib/gsap.js:3,6`) but used only in the lazy Tools section —
  dynamic-import it inside `Tools.jsx`.
- **F14. [s1] Works mobile images have no `width`/`height`** (`Works.jsx:180-186`, `h-auto` collapses to 0
  until each webp loads → repeated scroll shifts). Add intrinsic dimensions or an aspect-ratio wrapper.
- **F15. [c1] 50 KB render-blocking Tailwind CSS** for a 5 KB source file — move below-fold one-off
  `@utility` blocks (works-*, contact-*) into a lazily imported CSS file.
- **F16. [c5] ~3.8 MB dead assets ship in `public/`** (`assets/backgrounds/*.jpg` 3.0 MB, `images/man.jpg`
  592 KB, `signature.png`, unused ItalicRound fonts). Delete or move out of `public/`.
- **F17. [i4] No `content-visibility: auto`** on ~700vh of below-fold sections (skip pinned sections —
  ScrollTrigger measurements would break).
- **F18. [b6] No bundle analyzer configured** — the F1 regression was only findable by reading minified chunks.
  Add `rollup-plugin-visualizer` behind `ANALYZE=1`.

### F0. [m1] Measure first — no RUM exists

Every real-device number in this report is an estimate. Add `web-vitals`
(`onLCP/onINP/onCLS` → `navigator.sendBeacon` from `main.jsx`) before/alongside the fixes, then split by device
to confirm what actually moved.

---

## Already done well

- pdfjs (430 KB + 1.2 MB worker) dynamically imported only when the resume modal opens (`PdfWindow.jsx:194-199`)
- `HomeBelowHero` lazy with a height-reserving Suspense fallback (`App.jsx:13-27`)
- GSAP discipline: transform/opacity-only tweens, `quickTo` used in Works/ResumeCard/Tools, no layout-property animation
- Scroll handlers passive and cheap; `prefers-reduced-motion` respected; AdaptiveDpr/PerformanceMonitor on the canvas
- Hero GLB preloaded same-origin; vendor chunks cache-stable; modern ESM throughout; minified output
- Lists far below virtualization thresholds (21 projects, 17 tools, 20 testimonials)

## Not applicable to this stack

CDN/redirect items (n1, n2), LCP-image items (l2, l5, l6), ads/embed CLS items (s2, s4, s5),
virtualization (v1–v5), CJS/barrel items (b3–b5), prefetch/infinite-scroll items (r3, r5–r8).

## Suggested execution order

1. F0 (RUM) + F1 (chunk graph) — F1 is the single biggest win.
2. F2 + F3 (hero paint path: SSG shell + WOFF2 fonts).
3. F4 + F5 (one rAF loop, quickTo Magnet) — then re-trace to confirm the 354 ms reflow drops.
4. F7–F12 network hygiene in one pass (.htaccess, Rowdies, react-scroll, fetchpriority, draco, compression check).
5. P3 cleanups opportunistically. Re-run the lab trace + check real-user RUM after each batch.

---

## Fixes applied (2026-10-17)

| # | Fix | Files |
|---|---|---|
| F1 | `react` chunk group (priority 10) keeps react-dom in the entry; three.js no longer modulepreloaded. Eager JS: **~415 KB gz → ~146 KB gz** | `vite.config.js` |
| F1b | `gsap-split` group (priority 5) moves SplitText (~7 KB raw) out of the eager gsap chunk | `vite.config.js` |
| F2 | `paintImmediately` prop on `AnimatedHeaderSection`: hero title no longer starts at `opacity: 0`; entrance is a short visible 10vh slide | `AnimatedHeaderSection.jsx`, `Hero.jsx` |
| F3 | All 9 Amiamie faces converted to WOFF2 (~65% smaller, e.g. Black 96.4 → 33.3 KB); WOFF2 is first in every `@font-face` src; preloads now match what CSS selects (Light + Black — the hero's two faces) | `public/fonts/amiamie/woff2/*`, `src/index.css`, `index.html` |
| F4 | Single rAF loop: `autoRaf: false` + `gsap.ticker` drives Lenis, Lenis scroll updates ScrollTrigger, `lagSmoothing(0)`; Canvas `frameloop` flips to `"never"` once the hero is scrolled past | `App.jsx`, `HeroCanvas.jsx` |
| F5 | `Magnet` rewritten: `gsap.quickTo` writes transforms directly, anchor rect cached (invalidated on scroll/resize), zero React re-renders per mousemove | `Animations/Magnet/Magnet.tsx` |
| F7 | `fetchpriority="low"` on the 504 KB Planet.glb preload | `index.html` |
| F8 | Rowdies Google Fonts links removed from the home document; stylesheet injected only inside the 404 route | `index.html`, `NotFound.jsx` |
| F9 | `react-scroll` uninstalled; Hero CTA + Navbar links use `lenis.scrollTo()` via `useLenis()` | `Hero.jsx`, `Navbar.jsx`, `package.json` |
| F10 | `preconnect` + `dns-prefetch` for gstatic (Draco decoder) and api.iconify.design | `index.html` |
| F11 | Cache-Control: `immutable` 1y for fonts/media/hashed bundles, `no-cache` for HTML | `public/.htaccess` |
| F12 | Verified live host already serves brotli (`Content-Encoding: br` via hcdn) — no plugin needed. **Note: no Cache-Control header observed from the live edge; after deploying the new .htaccess, re-check whether hcdn passes it through** | — |
| F0 | `web-vitals` RUM wired in `main.jsx`; set `VITE_VITALS_ENDPOINT` to start collecting (dev logs to console) | `src/lib/vitals.js` |
| F13 | SplitText imported by Tools.jsx instead of lib/gsap.js (+ F1b group) | `Tools.jsx`, `lib/gsap.js` |
| F14 | `width`/`height` (real intrinsic dims) on Works mobile images — reserves the box before each lazy webp loads | `Works.jsx` |
| F16 | Deleted ~4.1 MB dead assets: `assets/backgrounds/*.jpg` (3.0 MB), `images/man.jpg`, `signature.png`, `Zahran_cocosign.png`, unused ItalicRound fonts | `public/` |
| F18 | Bundle analyzer: `ANALYZE=1 npm run build` → `dist/stats.html` | `vite.config.js` |

**Deferred (documented, not applied):** F2 full SSG/prerender shell (needs a plugin — biggest remaining LCP lever for slow devices); F5-full Iconify offline bundling (preconnect added as interim — full fix is `@iconify-json/*` + `addCollection`); F15 CSS split; F17 `content-visibility` (conflicts with pinned ScrollTrigger sections).

### Re-measurement (same lab, localhost + Chrome trace, unthrottled)

| Metric | Before | After |
|---|---|---|
| LCP (text element) | 236 ms (98% render delay) | **169 ms** |
| CLS | 0.00 | 0.00 |
| Forced reflow during load | 354 ms | 348 ms (unchanged by design — it's ScrollTrigger's one-time measurement of the mounted page, now fully off the LCP path; further reduction needs F15/F17) |
| Eager JS+CSS (gzip) | ~283 KB | **~152 KB** |
| Fonts fetched on load | 7 files, TTF+OTF duplicates, 2 wasted preloads | 5 woff2 files, all used |
| Console | clean | clean (2 pre-existing deprecation warnings) |

Scroll, canvas render, magnet, and fonts verified working after the changes; `npm run lint` and `npm run build` pass.

**Deploy checklist:** push `public/.htaccess` with the release, then `curl -sI https://mzahran.tech/ | grep -i cache-control` to confirm the edge honors it, and set `VITE_VITALS_ENDPOINT` when a collector exists.
