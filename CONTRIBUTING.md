# Contributing

Thanks for taking a look. This is a personal portfolio, so the most valuable
contributions are bug reports, accessibility findings and performance
observations — but pull requests are welcome too.

## Getting set up

```bash
git clone https://github.com/MohitKB22/portfolio.git
cd portfolio
cp .env.example .env.local
npm install
npm run dev
```

The site runs at <http://localhost:3000>. No environment variables are required
for local development; the contact form falls back to a `mailto:` handoff when
EmailJS credentials are absent.

## Project conventions

**All content is data.** No copy is hardcoded in components. Editing
`src/data/portfolio.json` or `src/data/projects.json` changes the UI. Both files
are validated by Zod at module load, so an invalid edit fails the build with a
readable error instead of rendering an empty section.

**Server components by default.** Add `'use client'` only when a component needs
state, effects, or browser APIs. Sections that are purely presentational stay on
the server.

**Motion is optional.** Every animation must degrade cleanly under
`prefers-reduced-motion: reduce`. The WebGL scene does not mount at all on
mobile, on reduced-motion, or without WebGL support.

**Accessibility is not a follow-up.** Semantic landmarks, one `h1` per page,
visible focus rings, labelled form controls, and `aria-live` on anything that
updates dynamically.

## Before opening a pull request

```bash
npm run validate:content   # Zod-validate the JSON content files
npm run lint
npm run typecheck
npm test
npm run format
npm run build
```

`npm run test:e2e` runs the Playwright suite; it builds and starts the app
automatically, so allow a couple of minutes.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org), enforced by
commitlint via a Husky `commit-msg` hook:

```
feat(projects): add architecture diagram to case study
fix(navbar): restore focus ring on the mobile toggle
docs(readme): document the Cloudflare Pages deployment path
content(blog): add post on evaluation-driven development
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, `revert`.

## Adding a blog post

Create `content/blog/your-slug.mdx`:

```mdx
---
title: 'Your title'
description: 'One or two sentences for search results and social cards.'
date: '2026-08-01'
category: 'RAG'
tags: ['RAG', 'Evaluation']
featured: false
---

Body content. `##` and `###` headings are collected into the table of contents
automatically, code fences are highlighted by Shiki, and reading time is
computed from the word count.
```

Set `draft: true` to hide a post from production builds while keeping it visible
in `npm run dev`. Routing, sitemap entries, RSS, OpenGraph images and related
posts are all derived — there is nothing else to register.

## Adding a project

Append an object to the `projects` array in `src/data/projects.json`. The schema
in `src/data/schema.ts` lists every required field. Set `"featured": true` to
surface it on the home page.
