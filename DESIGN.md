# Design

Visual companion to PRODUCT.md. Extracted from existing portfolio tokens plus the confirmed joyful preloader direction.

## Theme

Light-first portfolio (primary page `#e5e5e0`). Preloader uses a warmer cream day scene for contrast against the main experience, then hands off.

## Color

| Role | Value | Notes |
| --- | --- | --- |
| Primary page | `#e5e5e0` | `--color-primary` |
| Ink | `#1d3557` / near-black | Body and titles |
| Accent gold (legacy) | `#cfa355` | `--color-gold` (keep for existing sections) |
| Preloader cream | `#fff4e8` | Intro base |
| Preloader mint | `#06d6a0` | Progress / joy accent |
| Preloader coral | `#ff6b4a` | Secondary accent |
| Preloader sun | `#ffd166` | Pixel highlights |

## Typography

- Display / UI: Amiamie (`--font-amiamie`)
- Round accents: Amiamie-Round (`--font-amiamie-round`)
- Preloader may use monospace for pixel-adjacent progress labels only

## Components

- Preloader: full-viewport overlay, no cards, no glass
- Progress: flat mint fill on soft track, no glow stack
- Monogram: pixel rects, not spinning rings

## Layout

Centered single column on preloader; max width ~26–30rem. Main site sections unchanged structurally.
