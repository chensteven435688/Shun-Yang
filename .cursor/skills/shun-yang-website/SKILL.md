---
name: shun-yang-website
description: >-
  Shun Yang artist portfolio website conventions, content model, and completion
  status. Use when editing this repo, adding content, implementing Figma designs,
  or finishing remaining site sections.
---

# Shun Yang Website

Personal portfolio for Shun Yang (ΛTLΛST / Romantica). Cinematic dark aesthetic with Three.js hero, GSAP motion, and Lenis smooth scroll.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router, static export |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Motion | GSAP + ScrollTrigger, Lenis |
| 3D | Three.js (custom hero sculpture) |
| Deploy | GitHub Pages (`basePath: /Shun-Yang`) or `shunyang.com` |

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Single-page home — 7 sections |
| `/music/` | Full discography |
| `/moments/` | Photo gallery |
| `/music/intricate/` | Link-in-bio hub for Intricate album |

## Homepage sections

| Section | ID | Status |
|---------|-----|--------|
| Hero | `#hero` | Done — 3D sculpture, GSAP entrance |
| About | `#about` | Done |
| Featured Release | `#featured` | Done — not in nav (known gap) |
| Videos | `#videos` | Partial — 1 real + 1 placeholder |
| Moments | `#moments` | Placeholder UI — no real photos |
| Live | `#live` | Partial — upcoming show TBA |
| Contact | `#contact` | Done |

## Content editing

All content lives in typed TS modules under `src/data/`:

- `releases.ts` — discography entries
- `videos.ts` — video cards (`placeholder: true` for TBA items)
- `moments.ts` — gallery items; set `src`, `width`, `height`, `alt` for real photos
- `shows.ts` — live dates
- `socials.ts`, `intricate-links.ts`, `gallery.ts`

Assets go in `public/images/` and `public/video/`.

## Motion system

Central tokens in `src/lib/motion.ts`:

- Easing: `EASING.gsap.out`, `EASING.gsap.outStrong`, `EASING.cinematic`
- Duration: `DURATION.fast`, `DURATION.base`, `DURATION.slow`, `DURATION.cinematic`
- Scroll reveals: `src/lib/reveal.ts` with `data-reveal` attributes

When implementing Figma motion, adapt to GSAP — do not introduce new motion libraries.

## Design tokens

Defined in `src/app/globals.css` `@theme inline`:

- Surfaces: `olive`, `olive-dark`, `bg`, `bg-elevated`, `void`
- Type: `cream`, `cream-muted`
- Accent: `lime` (muted gold), `lime-dim`
- Metallic: `metal`, `metal-bright`, `iridescent`
- Fonts: Libre Baskerville (serif), DM Sans (body)

## Remaining work (priority)

1. **Moments gallery** — add photos to `public/images/moments/`, populate `moments.ts`
2. **Discography** — expand `releases.ts` with more ΛTLΛST / Romantica releases
3. **Videos** — replace or hide "Next Project" placeholder
4. **Live shows** — finalize 2026 summer show in `shows.ts`
5. **Launch polish** — favicon, nav alignment for Featured section
6. **Figma → code** — use Figma MCP + `figma-design-to-code` / `figma-implement-motion` skills

## Key files

```
src/app/page.tsx              # Homepage sections
src/components/hero/          # Three.js hero
src/components/effects/       # Cursor, grain, magnetic
src/lib/motion.ts             # Motion tokens
src/lib/hero3d.ts             # 3D hero config
src/lib/assetPath.ts          # GitHub Pages basePath helper
```

## Commands

```bash
npm run dev       # Local dev
npm run build     # Static export
npm run optimize:hero  # Hero image optimization
```
