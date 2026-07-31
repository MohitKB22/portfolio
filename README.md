<div align="center">

# Mohit Barse — AI/ML Engineer Portfolio

**Production-grade portfolio for an AI/ML engineer.**
Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber · MDX

[![CI](https://github.com/MohitKB22/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/MohitKB22/portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-2D7CFF.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-050A14?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MohitKB22/portfolio)

[Live site](https://mohitbarse.vercel.app) · [Deployment guide](docs/DEPLOYMENT.md) · [Architecture](docs/ARCHITECTURE.md) · [Editing content](docs/CONTENT.md)

</div>

---

## What this is

A complete, deployable portfolio website — not a template. Nine routes, 22
project case studies, five long-form MDX articles, a validated JSON content
layer, dynamic OpenGraph images, an RSS feed, a WebGL neural-network background
and a full CI pipeline.

The design language is deliberately "premium AI lab" rather than "generic
developer portfolio": deep navy surfaces, a single confident blue accent,
glassmorphic chrome, restrained motion, and typography that gets out of the way.

## Highlights

**Content is data.** Every visible string lives in `src/data/portfolio.json`,
`src/data/projects.json` or `content/blog/*.mdx`. Zod parses both JSON files at
module load, so an invalid edit fails `next build` with a readable error instead
of silently rendering an empty section. Updating the résumé is a JSON edit.

**Motion that respects the visitor.** Reveal-on-scroll, magnetic buttons, 3D
card tilt with a cursor-tracking highlight, a typing headline, animated counters,
a cursor glow, Lenis smooth scrolling and route transitions — all collapsed to
~0ms by a single global `prefers-reduced-motion` rule.

**WebGL with a budget.** A drifting node field with proximity-based edges, built
on React Three Fiber. Positions and edge vertices live in preallocated
`Float32Array`s and are mutated in place, so the render loop allocates nothing
and never triggers GC stutter. The scene mounts only on desktop viewports, only
when motion is allowed, and only when a WebGL context can actually be created.

**SEO done properly.** Per-route metadata, canonical URLs, five kinds of JSON-LD
(Person, WebSite, CollectionPage, SoftwareSourceCode, BlogPosting, BreadcrumbList),
dynamic `next/og` social cards, `sitemap.xml`, `robots.txt` and an RSS 2.0 feed.

**Accessible by construction.** Semantic landmarks, exactly one `h1` per page, a
skip link, visible focus rings everywhere, `aria-live` result counts,
`aria-invalid` + `role="alert"` form errors, and `aria-hidden` on every
decorative layer.

## Tech stack

| Layer      | Choice                                                 | Why                                                                         |
| ---------- | ------------------------------------------------------ | --------------------------------------------------------------------------- |
| Framework  | Next.js 15 (App Router)                                | Server components, route handlers, `next/og`, first-class Vercel deployment |
| UI         | React 19 + TypeScript (strict)                         | Types derived from Zod schemas — content and code cannot drift              |
| Styling    | Tailwind CSS v4                                        | CSS-first `@theme` tokens; the whole palette is one block                   |
| Components | shadcn-style primitives on Radix UI                    | Accessible behaviour, zero visual opinion                                   |
| Motion     | Framer Motion + GSAP + Lenis                           | Layout animations, timelines, smooth scroll                                 |
| 3D         | React Three Fiber + three.js                           | Declarative scene graph inside React                                        |
| Content    | MDX + gray-matter + Shiki                              | Frontmatter, GFM, highlighted code, heading anchors                         |
| Forms      | React Hook Form + Zod + EmailJS                        | One schema validates client and server                                      |
| Data       | TanStack Query                                         | Cached client fetches                                                       |
| Feedback   | Sonner                                                 | Toasts                                                                      |
| Analytics  | Vercel Analytics + Speed Insights                      | Real-user metrics                                                           |
| Testing    | Vitest + Testing Library + Playwright                  | Unit and end-to-end                                                         |
| Quality    | ESLint 9 · Prettier · Husky · lint-staged · commitlint | Enforced on every commit                                                    |

## Quick start

```bash
git clone https://github.com/MohitKB22/portfolio.git
cd portfolio
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>. No environment variables are required for local
development — the contact form falls back to a pre-filled `mailto:` handoff when
EmailJS credentials are absent.

```bash
npm run build && npm run start   # production build, served locally
```

## Scripts

| Command                           | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `npm run dev`                     | Development server                                      |
| `npm run build`                   | Production build                                        |
| `npm run start`                   | Serve the production build                              |
| `npm run lint` / `lint:fix`       | ESLint                                                  |
| `npm run typecheck`               | `tsc --noEmit`                                          |
| `npm run format` / `format:check` | Prettier, with Tailwind class sorting                   |
| `npm test` / `test:watch`         | Vitest unit tests                                       |
| `npm run test:e2e`                | Playwright end-to-end tests (builds and starts the app) |
| `npm run validate:content`        | Zod-validate the JSON content files                     |

## Routes

| Route                                     | Contents                                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                       | Hero, stats, tech marquee, about preview, featured projects, experience, skills, AI stack, achievements, live GitHub stats, latest writing |
| `/about`                                  | Long-form bio, alternating journey timeline (2007→now), education, certifications, interests                                               |
| `/experience`                             | Expandable role cards with metrics, education, certifications                                                                              |
| `/projects`                               | All 22 projects with category tabs and full-text search                                                                                    |
| `/projects/[slug]`                        | Case study: problem, approach, features, architecture, stack, related projects                                                             |
| `/skills`                                 | Eight skill domains with animated bars, plus the AI toolchain                                                                              |
| `/achievements`                           | Metric cards, live GitHub stats, certifications                                                                                            |
| `/blog`                                   | Searchable, category-filtered article index                                                                                                |
| `/blog/[slug]`                            | MDX article with table of contents, highlighted code, share links, related posts                                                           |
| `/contact`                                | Validated form, contact details, copy-to-clipboard, social links                                                                           |
| `/api/og`                                 | Dynamic OpenGraph image                                                                                                                    |
| `/api/contact`                            | Zod-validated fallback contact endpoint                                                                                                    |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml` | SEO endpoints                                                                                                                              |

## Making it yours

1. **`src/data/portfolio.json`** — profile, experience, education, skills, AI stack, achievements, certifications, timeline, SEO.
2. **`src/data/projects.json`** — one object per project; a new object is a new page, filter tab, sitemap entry and JSON-LD record.
3. **`content/blog/*.mdx`** — one file per article.
4. **`public/Mohit_Barse_Resume.pdf`** — replace with your own, or point `profile.resumePath` elsewhere.
5. **`src/app/globals.css`** — the `@theme` block is the entire colour system.

Then `npm run validate:content` to confirm the shape is right.
Full reference: [docs/CONTENT.md](docs/CONTENT.md).

## Design tokens

| Token                                                                | Value                                         | Usage                       |
| -------------------------------------------------------------------- | --------------------------------------------- | --------------------------- |
| `--color-base`                                                       | `#050A14`                                     | Page background             |
| `--color-surface`                                                    | `#0A1224`                                     | Secondary surfaces          |
| `--color-card`                                                       | `#101A2F`                                     | Cards                       |
| `--color-card-hover`                                                 | `#132240`                                     | Card hover, glass base      |
| `--color-brand`                                                      | `#2D7CFF`                                     | Primary blue                |
| `--color-brand-accent`                                               | `#5AA8FF`                                     | Accent, links, highlights   |
| `--color-violet` / `--color-teal` / `--color-amber` / `--color-rose` | `#7C5AFF` / `#00C2A8` / `#FF8A3D` / `#E5484D` | Category accents            |
| `--color-ink`                                                        | `#F5F7FA`                                     | Primary text                |
| `--color-muted` / `--color-subtle`                                   | `#8EA2C6` / `#64789C`                         | Secondary and tertiary text |
| `--color-line`                                                       | `rgb(255 255 255 / 8%)`                       | Borders                     |

## Deployment

`main` deploys automatically once the repository is connected. Full instructions
for Vercel, Netlify, Cloudflare Pages, Docker and static export, plus the
environment-variable reference and a post-deployment checklist, are in
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

```bash
# Docker, in one line
docker compose up -d --build
```

> **One thing to remember:** set `NEXT_PUBLIC_SITE_URL` to your production URL
> and redeploy. Canonical tags, the sitemap, the RSS feed and OpenGraph metadata
> are all derived from it.

## Contributing

Bug reports, accessibility findings and performance observations are especially
welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for conventions and the
pre-PR checklist.

## License

Source code is [MIT](LICENSE). The personal content — résumé text, biography,
project write-ups, blog articles and photograph — belongs to Mohit Barse. If you
fork this as a starting point, please replace `src/data/` and `content/` with
your own material.

---

<div align="center">

**Mohit Barse** · AI/ML Engineer · Nagpur, India

[GitHub](https://github.com/MohitKB22) · [LinkedIn](https://www.linkedin.com/in/mohit-b-9a997b301/) · [LeetCode](https://leetcode.com/u/Mohit_Barse/) · [mohitbarse2230@gmail.com](mailto:mohitbarse2230@gmail.com)

</div>
