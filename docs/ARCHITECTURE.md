# Architecture

## Principles

1. **Content is data, not markup.** Every string a visitor reads comes from
   `src/data/*.json` or `content/blog/*.mdx`. Components render content; they
   never contain it. Updating the résumé is a JSON edit, not a code change.
2. **Validate at the boundary.** Zod schemas parse both JSON files at module
   load. A malformed edit throws during `next build` with a readable error
   instead of silently rendering an empty section in production.
3. **Server by default.** Only components that need state, effects or browser
   APIs are client components. The home page ships a small client bundle despite
   heavy visuals.
4. **Motion is progressive enhancement.** Reduced motion, mobile, and
   WebGL-unavailable are all first-class paths, not fallbacks.

## Directory layout

```
├── content/blog/            MDX articles (frontmatter + body)
├── public/                  Résumé PDF, icons, manifest
├── scripts/
│   └── validate-content.ts  Standalone Zod validation for CI
├── src/
│   ├── app/                 App Router: pages, route handlers, SEO files
│   │   ├── api/contact/     Zod-validated fallback contact endpoint
│   │   ├── api/og/          Dynamic OpenGraph images via next/og
│   │   ├── rss.xml/         RSS 2.0 feed
│   │   ├── robots.ts        MetadataRoute.Robots
│   │   └── sitemap.ts       MetadataRoute.Sitemap (static + dynamic routes)
│   ├── components/
│   │   ├── blog/            Post cards, MDX renderer, ToC, share links
│   │   ├── layout/          Navbar, footer, page header
│   │   ├── motion/          Reveal, Tilt, Magnetic, Counter, Typing, ScrollProgress
│   │   ├── projects/        Project card and filter
│   │   ├── providers/       Lenis, TanStack Query, Sonner
│   │   ├── sections/        Composed page sections
│   │   ├── three/           React Three Fiber scene + capability gate
│   │   └── ui/              shadcn-style primitives
│   ├── data/
│   │   ├── portfolio.json   Profile, experience, education, skills, AI stack…
│   │   ├── projects.json    22 project case studies
│   │   ├── schema.ts        Zod schemas + inferred TypeScript types
│   │   └── index.ts         Parsed, typed exports and derived selectors
│   ├── hooks/               useMounted, useMediaQuery, useScrollState, useActiveHeading
│   └── lib/                 utils, site config, SEO, JSON-LD, blog, MDX, GitHub
└── tests/
    ├── unit/                Vitest — content, utils, blog
    └── e2e/                 Playwright — navigation, filtering, forms, SEO routes
```

## Rendering strategy

| Route                                               | Strategy                         | Notes                                         |
| --------------------------------------------------- | -------------------------------- | --------------------------------------------- |
| `/`                                                 | Static, with a 1-hour ISR island | `GitHubStats` fetches with `revalidate: 3600` |
| `/about`, `/experience`, `/skills`, `/achievements` | Static                           | Pure content                                  |
| `/projects`                                         | Static                           | Filtering and search happen client-side       |
| `/projects/[slug]`                                  | Static, `generateStaticParams`   | 22 pages prerendered                          |
| `/blog`                                             | Static                           | Search and filter are client-side             |
| `/blog/[slug]`                                      | Static, `generateStaticParams`   | MDX compiled at build time                    |
| `/contact`                                          | Static shell                     | Form is a client component                    |
| `/api/contact`                                      | Dynamic                          | Zod validation, no persistence                |
| `/api/og`                                           | Edge runtime                     | Dynamic OG image from query params            |

## The WebGL layer

`src/components/three/neural-scene.tsx` renders a drifting node field with
proximity edges, plus a wireframe icosahedron. Two implementation details matter:

- **Zero per-frame allocation.** Node positions and edge vertices live in
  preallocated `Float32Array`s. Each frame mutates them and bumps
  `needsUpdate`; edge count is applied with `setDrawRange`. No garbage is
  produced, so there is no GC stutter.
- **Deterministic seeding.** A linear congruential generator seeds initial
  positions, so the first frame is identical on every load.

`src/components/three/scene.tsx` is the gate: the scene mounts only after
hydration, on viewports ≥1024px, when motion is allowed, and when a WebGL
context can actually be created. On any other configuration the CSS backdrop
(mesh gradient, line grid, aurora blobs, noise) carries the visual alone.

## Content pipeline

```
portfolio.json ─┐
                ├─→ Zod parse (build time) ─→ typed exports ─→ server components
projects.json ──┘

content/blog/*.mdx ─→ gray-matter ─→ frontmatter + body
                                      ├─→ reading-time  ─→ metadata
                                      ├─→ extractHeadings ─→ table of contents
                                      └─→ MDXRemote (RSC)
                                            ├─ remark-gfm
                                            ├─ rehype-slug
                                            ├─ rehype-pretty-code (Shiki)
                                            └─ rehype-autolink-headings
```

## Theming

Light is the default; dark is a class on `<html>`. `@theme` in `globals.css`
holds the light palette, and `html.dark` overrides the same variables with the
dark palette. Because every utility resolves through `var(--color-*)`, no
component class needs to know which theme is active — `text-muted` is correct in
both. Composite values that are not single tokens (card gradients, panel fills,
grid patterns, shadows, prose colour, blob opacity) are themed the same way via
plain custom properties.

An inline script in `app/layout.tsx` applies the stored preference before first
paint, so a reload never flashes the wrong palette.

### One naming rule, learned the hard way

**Never name a colour token after a word in Tailwind's built-in scales**
(`xs`, `sm`, `base`, `md`, `lg`, `xl`, …).

The page background was originally `--color-base`. That made Tailwind treat
`text-base` as a _colour_ utility shadowing the built-in `text-base` font size,
so every element with `sm:text-base` was painted in `#050A14` — the page
background. Four paragraphs (the hero summary, every `SectionHeading`
description, the About body copy and the CTA) rendered as black text on a black
page, at a 1.00:1 contrast ratio. The token is now `--color-night`.

Contrast is verified rather than assumed. Body text is ≥6.6:1 in light and
≥13.7:1 in dark; the smallest label colour is ≥4.9:1 in both.

## Styling

Tailwind CSS v4, configured CSS-first. `src/app/globals.css` holds:

- `@theme` — colour, font, radius, shadow and animation tokens. Everything
  referenced in components resolves from here, so a palette change is one block.
- `@layer base` — resets, focus rings, scrollbar, Lenis integration, and a
  global `prefers-reduced-motion` kill switch.
- `@layer components` — composite classes (`.card-surface`, `.glass`,
  `.mesh-gradient`, `.marquee-track`, `.prose-portfolio`).
- `@utility` — custom utilities such as `bg-grid-fade`.

`tailwind.config.ts` is loaded via `@config` and exists for editor IntelliSense
and Prettier class sorting.

## Accessibility decisions

- One `h1` per page; sections are `<section>` with `aria-labelledby` where the
  heading is visually hidden.
- Skip link as the first focusable element.
- `:focus-visible` rings on every interactive element, never removed.
- Result counts in the project and blog filters are `aria-live="polite"`.
- Form fields use `aria-invalid` and `aria-describedby`; errors are `role="alert"`.
- Decorative layers are `aria-hidden` with `pointer-events: none`.
- Marquee duplicates are `aria-hidden` so screen readers hear the list once.
- The global reduced-motion rule collapses every animation and transition to
  ~0ms rather than relying on per-component opt-outs.
- **Reveal animations never touch `opacity`.** Framer Motion serialises its
  `initial` styles into the server-rendered HTML, so a fade-in from
  `opacity: 0` ships markup that is invisible until hydration finishes — on a
  slow device that reads as missing or black text. Every scroll reveal animates
  `transform` only, so copy is legible in the raw HTML and the animation stays
  on the compositor.

## Performance decisions

- WebGL is desktop-only and capability-gated, keeping mobile lean. The node
  field is 52 points, and the O(n²) edge pass runs on alternate frames.
- **No animated blur.** Large blurred elements are static. Animating a 34-42rem
  element carrying a 130px blur repaints most of the viewport every frame and
  was the single biggest cost in an earlier revision.
- No cursor-following glow and no per-card specular highlight: both rebuilt
  large radial gradients on every `mousemove`.
- No route-level `loading.tsx`. Every page is statically prerendered, so a
  page-level Suspense fallback only adds a spinner flash between navigations.
  The one async component (live GitHub stats) has its own boundary and skeleton.
- The UI makes zero remote image requests; the identity mark and project
  previews are drawn in CSS.
- `optimizePackageImports` for `lucide-react`, `react-icons` and `framer-motion`.
- Icons resolve through static maps — no dynamic imports, fully tree-shakeable.
- The hero portrait uses `next/image` with `priority` and explicit `sizes`.
- Fonts are self-hosted by `next/font` with `display: swap` and CSS variables.
- Scroll listeners are passive and coalesced into a single `requestAnimationFrame`.
- Marquee and aurora animations are pure CSS transforms — compositor only.
