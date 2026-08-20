# Preloader shape brief (confirmed)

Confirmed via plan approval: implement Portfolio content sync + anti-slop preloader.

## Purpose

Hold the home route until the hero 3D scene is ready and a short intro completes, without looking like a luxury AI portfolio template.

## Scene sentence

A recruiter opens the site on a bright laptop at midday; the first screen should feel playful pixel craft and warm, not a dim gold vault.

## Color strategy

Committed warm day-joy: cream base (`#fff4e8` / primary-adjacent), mint and coral accents, deep ink text. Not gold-on-black.

## Structure

```
┌─────────────────────────────────────┐
│  cream field + soft pixel grid       │
│                                     │
│         [pixel Z stamp]             │
│         Mohamed Zahran              │
│         Frontend engineer           │
│         RICOH Europe                │
│                                     │
│         ▓▓▓▓▓░░░░  62%              │
│         Loading scene               │
└─────────────────────────────────────┘
```

- One centered column
- Pixel monogram (rect-built Z), no orbit ring
- Short status line + honest progress from `heroLoadProgress`
- Exit when intro timeline finishes AND hero progress is 100 (App already combines these)

## Motion

- Ease: power3.out / power4.out only (no bounce/elastic)
- Reduced motion: instant opacity 1, skip timeline flourishes, still show progress
- Minimum visible time ~800ms to avoid flash when assets are cached

## Copy

- Title: Mohamed Zahran (or ZAHRAN mark + name)
- Line: Frontend engineer · RICOH Europe
- Status: Loading scene / Ready
- Ban: calibrating, shaders, orbit, Full Stack Developer

## A11y

`role="status"`, `aria-busy={true}` while open, announced progress percent, decorative pixels `aria-hidden`.

## Out of scope

Restyle of Hero/About/Works chrome beyond content sync.
