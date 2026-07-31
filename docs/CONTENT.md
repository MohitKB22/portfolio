# Editing content

Nothing in this site is hardcoded. Three files cover almost every change.

## `src/data/portfolio.json`

| Key              | Controls                                                                                           |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `profile`        | Name, titles, summaries, avatar, contact details, availability badge, résumé path                  |
| `stats`          | The four-tile counter strip on the home page                                                       |
| `social`         | Navbar, footer and contact links (icon names: `github`, `linkedin`, `leetcode`, `twitter`, `mail`) |
| `navigation`     | Top navigation and footer links                                                                    |
| `experience`     | Experience timeline. `end: null` renders "Present" and marks the role current                      |
| `education`      | Education timeline                                                                                 |
| `skillGroups`    | Skills page tabs and progress bars (`level` is 0-100)                                              |
| `aiStack`        | The dedicated AI section, grouped by `category`                                                    |
| `techStack`      | The scrolling marquee (icon names come from `react-icons/si`)                                      |
| `achievements`   | Achievements cards                                                                                 |
| `certifications` | Certification cards                                                                                |
| `interests`      | About-page interest grid                                                                           |
| `timeline`       | The alternating journey timeline (`type`: `education` \| `work` \| `milestone`)                    |
| `contact`        | Contact heading, subheading, response time, topic badges                                           |
| `seo`            | Site name, title template, description, keywords, locale                                           |

Icon names must exist in the maps in `src/components/ui/icons.tsx`. Add the
import there first if you need a new one.

## `src/data/projects.json`

One object per project. Required fields:

```jsonc
{
  "slug": "unique-url-segment",
  "title": "Project Title",
  "tagline": "One sentence for cards and social previews.",
  "category": "Agentic AI", // becomes a filter tab automatically
  "featured": true, // show on the home page
  "year": "2026",
  "status": "active", // active | archived | wip
  "repo": "MohitKB22/repo-name",
  "github": "https://github.com/MohitKB22/repo-name",
  "demo": null, // or a live URL
  "stars": 2,
  "accent": "#5AA8FF", // drives the card's gradient preview
  "description": "Two or three sentences of overview.",
  "problem": "What was actually hard.",
  "approach": "How you attacked it.",
  "features": ["…"], // at least one
  "architecture": [{ "layer": "Ingestion", "detail": "…" }],
  "stack": ["Python", "FastAPI"], // at least one
  "metrics": [{ "label": "Agents", "value": "5" }], // three render best
}
```

Adding an object is enough: the case-study route, sitemap entry, JSON-LD, filter
tab and related-project links are all derived.

## `content/blog/*.mdx`

```mdx
---
title: 'Post title'
description: 'Shown in cards, search results and social previews.'
date: '2026-08-01'
category: 'RAG'
tags: ['RAG', 'LangGraph']
featured: false
draft: false
---

Markdown body. `##` and `###` headings populate the table of contents.
```

Reading time, word count, routing, RSS, sitemap and related posts are computed.
`draft: true` hides a post from production builds but keeps it in `npm run dev`.

## Replacing the résumé

Drop your PDF at `public/Mohit_Barse_Resume.pdf`, or use a different filename and
update `profile.resumePath` in `portfolio.json`. The navbar, hero, contact page
and the `/resume` redirect all read that one value.

## Switching the default theme

`globals.css` ships light as the default and dark under `html.dark`. To make
dark the default, swap the two blocks of variable values and flip the fallback
in the inline script in `src/app/layout.tsx`.

## Replacing the photograph

Two images are used, both in `public/images/`:

| File                  | Used by                         | Shape             |
| --------------------- | ------------------------------- | ----------------- |
| `avatar.jpg`          | Hero, inside the rotating rings | square, 1000×1000 |
| `avatar-portrait.jpg` | About page card                 | 4:5, 880×1100     |

`profile.avatar` and `profile.avatarLocal` in `portfolio.json` point at them.
Replace the files, keep the aspect ratios, and keep each under ~150 KB — both
are served through `next/image`, which converts to AVIF/WebP on the fly.

## After any content edit

```bash
npm run validate:content
```

This runs the Zod schemas standalone and prints exactly which field is wrong.
The same validation runs during `npm run build`, so a bad edit can never reach
production.
