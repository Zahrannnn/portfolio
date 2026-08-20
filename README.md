# Mohamed Zahran — Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://docs.pmnd.rs/react-three-fiber)
[![Live](https://img.shields.io/badge/Live-mohamed--zahrann.vercel.app-111111?style=flat-square)](https://mohamed-zahrann.vercel.app)

Personal portfolio for **Mohamed Zahran**, frontend engineer at RICOH Europe (formerly Corelia). Product UIs, marketplace systems, and agentic workflows — React, TypeScript, GSAP, and a Three.js hero.

[Features](#features) • [Getting started](#getting-started) • [Scripts](#scripts) • [Structure](#project-structure) • [Stack](#stack)

## Overview

A Vite + React single-page site with smooth scrolling (Lenis), scroll-driven motion (GSAP), and a 3D planet hero (React Three Fiber). Content covers selected projects, client work, tools, and contact.

> [!NOTE]
> Live site: [mohamed-zahrann.vercel.app](https://mohamed-zahrann.vercel.app)  
> Profile & socials: [github.com/Zahrannnn](https://github.com/Zahrannnn) · [LinkedIn](https://www.linkedin.com/in/mohamed-zahran-383859222/)

## Features

- **Hero with 3D planet** — low-poly render using materials from a Draco GLB; simple spinner while the model loads
- **Performance-minded WebGL** — Adaptive DPR, lighter mobile path (no Environment/shadows), progress gated on real asset load
- **Works & clients** — CRM, marketplace, storefront, and freelance sites with live links
- **Motion** — GSAP ScrollTrigger sections, Framer Motion accents, Lenis smooth scroll
- **SEO** — meta tags and JSON-LD oriented to frontend engineering at RICOH Europe

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- npm 10+

## Getting started

```bash
git clone https://github.com/Zahrannnn/portfolio.git
cd portfolio
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

> [!TIP]
> Prefer a production-like check after changes: `npm run build && npm run preview`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
portfolio/
├── public/
│   ├── assets/          # Project & tool images
│   ├── fonts/           # Amiamie typefaces
│   └── models/          # Planet.glb (hero)
├── src/
│   ├── components/      # Shared UI, motion, ModelSpinner
│   ├── constants/       # Projects, services, socials, tools
│   ├── sections/        # Hero, Works, About, Contact, …
│   ├── config/seo.js
│   ├── App.jsx
│   └── main.jsx
├── PRODUCT.md           # Brand / product context
├── DESIGN.md            # Visual tokens notes
└── package.json
```

## Stack

| Layer | Choices |
| --- | --- |
| App | React 19, Vite 6, React Router |
| Style | Tailwind CSS 4, Amiamie |
| Motion | GSAP (+ ScrollTrigger, Observer), Framer Motion, Lenis |
| 3D | three, @react-three/fiber, @react-three/drei |
| Forms / validation | react-hook-form, Zod (where used) |

## Troubleshooting

| Symptom | What to try |
| --- | --- |
| Hero spinner never clears | Check Network for `/models/Planet.glb`; hard-refresh; confirm WebGL works in the browser |
| Blank or black canvas | Update GPU drivers; try another browser; on low-end devices the mobile lighting path should still run |
| Fonts look wrong | Ensure `public/fonts` is present (not gitignored) after clone |
| Smooth scroll feels off | Lenis is root-level in `App.jsx`; disable temporarily if debugging scroll-linked GSAP |

If something else breaks, open an issue on [Zahrannnn/portfolio](https://github.com/Zahrannnn/portfolio/issues) with the command you ran and the console error.
