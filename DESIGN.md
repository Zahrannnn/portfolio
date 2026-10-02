# Design System — mzahran.tech

Extracted from the code (`src/index.css`, `src/sections/`, `src/components/`, `index.html`).
Companion to PRODUCT.md. Keep this file updated alongside visual changes.

## 1. Principles

- **Type-led editorial**: Amiamie display type and huge scale do the design work; decoration is minimal.
- **Alternating light/dark chapters**: sections alternate between warm off-white (`--color-primary`) and black, each with rounded top corners — a recurring "page turn" rhythm.
- **One accent**: gold (`#cfa355`) is the only accent color — dashes, pins, counters, icons, progress.
- **Transform-only motion**: GSAP drives everything; only `transform` and `opacity` animate. All GSAP setup lives in `src/lib/gsap.js` (ScrollTrigger + SplitText + useGSAP registered once).
- **Reduced motion is a first-class mode**: every animated section branches via `gsap.matchMedia()` and `(prefers-reduced-motion)`.

## 2. Color

Tokens live in `@theme` (`src/index.css`).

| Token | Value | De-facto usage |
| --- | --- | --- |
| `--color-primary` | `#e5e5e0` | Light chapter background (body default), resume paper cards use `#f7f7f2` |
| Ink / text on light | `black` | Body default; quote wall text `black/90` |
| Text on dark | `white` with opacity steps (`/90 · /60 · /55 · /45 · /40 · /35`) | Dark chapters; `white/25` hairlines |
| `--color-gold` | `#cfa355` | The single accent: dashes, pins, counters, quote glyphs, focus rings, star icon |
| `--color-DarkLava` | `#393632` | Dark warm gray (404 page text, ghost text stroke `rgb(57 54 50 / 0.16)`) |
| `--color-SageGray` | `#8b8b73` | 404 page accents |
| Paper | `#f7f7f2` | Resume card surface |
| PDF window grays | `#1c1c1e` shell · `#2a2a2c` title bar · `#454749` content | macOS viewer |
| Traffic lights | `#ff5f57` / `#febc2e` / `#28c840` | PdfWindow only |
| Legacy meta | `#06d6a0` | `theme-color` meta + ModelSpinner ring only — do not introduce elsewhere |

Section ink rules: light chapters use `text-black` (+ `black/45–55` for secondary), dark chapters use `text-white` (+ `white/40–60`).

## 3. Typography

| Family | Token / face | Weights | Usage |
| --- | --- | --- | --- |
| Amiamie | `--font-amiamie` (body default) | 300 / 400 / 900 (+ italics) | Everything: display, quotes, titles, body |
| Amiamie Round | `--font-amiamie-round` | 400 (+ Black/Italic variants) | Counters, small labels, tabular numbers |
| Rowdies | Google Fonts | 300/400/700 | 404 page only |

Loading: `@font-face` from `/fonts/amiamie/{otf,ttf}` (keep paths in sync with `public/fonts/amiamie/`), `font-display: swap`; Rowdies via Google Fonts in `index.html`; the two hero fonts are preloaded.

Scale & case conventions (utilities in `index.css`):

| Utility | Scale | Usage |
| --- | --- | --- |
| `banner-text-responsive` | 68 → 152px | Chapter titles (uppercase) |
| `value-text-responsive` | 24 → 32px | Chapter description lines (uppercase) |
| `contact-text-responsive` | 42 → 100px | Kinetic band lines |
| `text-outline-ink` | 1.5px stroke `rgb(57 54 50 / 0.16)`, transparent fill | Ghost indices + backdrop words |

Tracking: kickers/labels `tracking-[0.25em–0.5em]` uppercase at 9–12px; arrows and dividers separate attribution parts. Quotes render sentence-case in Amiamie Light; everything else on headers is uppercase.

## 4. Layout — section rhythm

Single page, ordered; every chapter is `min-h-screen`-ish with `px-10` gutters and `rounded-t-4xl` over the previous chapter:

| Order | Section | `id` | Background |
| --- | --- | --- | --- |
| 1 | Hero | `home` | light (default) |
| 2 | ServiceSummary | — | light |
| 3 | Services | `services` | black, `rounded-t-4xl` |
| 4 | About | `about` | black, `rounded-b-4xl` (closes the black block) |
| 5 | Tools | `tools` | light, `rounded-t-4xl` |
| 6 | Works | `work` | black, `rounded-t-4xl` |
| 7 | QuoteBand | `testimonials` | light (`bg-primary`), `rounded-t-4xl` |
| 8 | Contact | `contact` | black, `rounded-t-4xl` |

Rule: a section "cuts" into the previous one by rounding its own top corners over the previous background. Alternate light/dark; never place two same-color rounded sections adjacently.

## 5. Radius & elevation

- Sections `rounded-t-4xl`; cards/panels `rounded-xl`; pills/badges/buttons `rounded-full`; PDF pages `rounded-sm`.
- Shadows (dark sections): floating preview `0_30px_80px_-20px rgba(0,0,0,.7)`; resume paper `0_24px_60px_-18px rgba(0,0,0,.65)`; PDF window `0_40px_120px_-20px rgba(0,0,0,.8)`.
- Hairlines: `1px` at `black/15` (light) or `white/15` (dark); section rules `h-0.5` at `white/25` (dark) or `border-b-2 border-black/80` (light).

## 6. Motion system

Engine: GSAP 3.15 + ScrollTrigger + SplitText via `src/lib/gsap.js` (single registration point), `useGSAP` scoped per component, `contextSafe` for listeners, `gsap.matchMedia()` for breakpoints/reduced-motion. Lenis smooth scroll (`lerp .07`, `duration 1.8`, `wheelMultiplier .7`).

Easing vocabulary (keep to these):

| Ease | Used for |
| --- | --- |
| `circ.out` | Header rise (`y: 50vh`, 1s) |
| `power3.out` | Reveals, taglines, tilt returns |
| `power2.inOut` | TextZoo flips, squish micro-steps |
| `back.out(1.15–2.5)` | Pops: badges, checkmark, window settle |
| `power3.in` | Genie close |
| `none` | All scrubbed/parallax motion |
| `sine.inOut` | Idle float yoyo |

Durations: micro 0.1–0.3s · transitions 0.3–0.6s · reveals 0.55–1s · genie 0.42–0.55s · scrubs `scrub: 1` · idle float 2.4s yoyo.

Signature patterns:

- **Chapter header**: kicker (0.5em-tracked caps) + giant title rises from `50vh` (`circ.out`), description lines stagger up (`y: 40`, 0.12 stagger).
- **Kinetic lines**: `xPercent` ±10–35% scrubbed to each line's viewport transit, alternating direction, `autoAlpha 0.2 → 1` (ServiceSummary, QuoteBand). Mobile uses the small-drift variant (±4–9%).
- **Hover sweep**: an `origin-left scale-x-0` layer sweeps to `scale-x-100` (`duration-300`), text color inverts (Works rows, ink-fill buttons).
- **Genie window**: FLIP from origin rect — `x/y` center-delta + `scaleX/scaleY` stretch, bake layout on complete.
- **3D tilt**: `quickTo` rotationX/Y clamped ±10°, `transformPerspective: 800/900`, elastic settle; sheen band tracks the cursor.
- **Velocity skew**: track-level `skewX` from `getVelocity()` via proxy tween, clamped ±5° (Tools).
- **Masked text**: SplitText `type: chars, mask: chars`, `yPercent: 120` rise on entry (Tools panel names).
- **Counters**: tabular `01 / N` + hairline progress rail driven by ScrollTrigger `onUpdate`.

Accessibility: transform/opacity only; `will-change` sparingly; `prefers-reduced-motion` gets static layouts and instant state swaps; keyboard focus rings gold (`focus-visible:outline-[color:var(--color-gold)]`).

## 7. Component recipes

| Component | Recipe |
| --- | --- |
| Chapter header | `AnimatedHeaderSection` — kicker, split-word title, rule, right-aligned description (`AnimatedTextLines`) |
| Kicker row | small-caps + gold star-four icon, right-side gold counter `NN / label`, `border-b` hairline (Tools, QuoteBand) |
| Text link | `TextZoo` — dual stacked text, flips `±100%` on hover; place inside `<a>` |
| Works row | index-free title + frameworks + `↗`; white sweep overlay on hover (desktop), floating `560×350` (16:10) cursor-follow preview (image projects only, fades on scroll); mobile: framed image card `max-h-[280px] object-cover object-top` |
| Quote line | gold quote icon + Amiamie Light sentence + gold-dash attribution (role · project), parallax-drifted |
| Resume card | paper `#f7f7f2` A4 mini, gold pin, skeleton bars, sheen band, idle float, 3D tilt; ink-fill download pill with ring→check states |
| PDF window | macOS chrome (`#1c1c1e`/`#2a2a2c`/`#454749`), traffic lights, genie in/out, canvas pages from pdf.js |
| Pills | `rounded-full` + `px-6–7 py-3–3.5` + `tracking-[0.28–0.3em]` 11px uppercase; ink-fill or outline hover |
| Badge circle | gold `h-8–9 w-8–9` circle + black star-four icon (card pin, kicker) |
| Ghost type | `text-outline-ink` at 10–24vw, `opacity ≤ 70%` |
| Skeleton bars | `h-1.5 rounded-full black/10–15` rows with one gold bar |

## 8. Iconography & assets

- Icons: Iconify at runtime — `mdi:star-four-points` (brand glyph), `lucide` set (arrows, download, check, quote, expand…). Colored brand marks for stack badges come from `logos:*` / `simple-icons:*`.
- Assets: fonts `/fonts/amiamie/**`, hero model `/models/Planet.glb`, project shots `/assets/projects/*.webp` (16:10-crop friendly), stack marks `/assets/tools/*.webp`.
- Favicon: inline SVG "MZ" monogram (gold on black).

## 9. Copy conventions

- Kickers/labels: uppercase, wide tracking, title-ish fragments ("Build faster, ship cleaner").
- Quotes: short first-person outcomes (≤ 10 words), attributed `Role · Project`.
- Counters: zero-padded tabular (`01 / 12`).
