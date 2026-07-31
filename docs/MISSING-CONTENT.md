# Missing content report

Everything in this site was extracted from the sources you supplied — your
résumé PDF, your GitHub profile (`MohitKB22`, all 23 public repositories via the
GitHub API), your LinkedIn URL, your LeetCode URL, and the education timeline you
typed out. Nothing was invented.

Below are the only fields where a source was unavailable, ambiguous, or where I
had to fill a gap. Each one lists exactly what to change and where.

---

## 1. Required — the site works but these are placeholders you should set

| Field                   | Current value                                                 | Where to change                                               | Why it matters                                                                                                                               |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Production URL**      | `https://mohitbarse.vercel.app`                               | `NEXT_PUBLIC_SITE_URL` in `.env.local` / your host's env vars | Canonical tags, sitemap, RSS and OpenGraph URLs are all derived from it. Set it and redeploy.                                                |
| **EmailJS credentials** | Empty — the form falls back to a pre-filled `mailto:` handoff | `NEXT_PUBLIC_EMAILJS_*` in your env vars                      | Without them the form still works, but opens the visitor's mail client instead of sending directly. Setup steps are in `docs/DEPLOYMENT.md`. |

The profile photograph you supplied is now in place at
`public/images/avatar.jpg` (hero) and `public/images/avatar-portrait.jpg`
(About page), optimised from 1.74 MB to ~110 KB each.

## 2. Not available from any source — currently omitted

| Field                                        | Status                                                             | Note                                                                                                                                                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LinkedIn work/education detail**           | Not retrievable                                                    | LinkedIn blocks automated profile reads. Everything on the Experience and Education pages came from your résumé plus the timeline you typed. If your LinkedIn has anything extra, add it to `experience` / `education` in `portfolio.json`. |
| **Exact LeetCode contest rating and badges** | Omitted                                                            | LeetCode's public profile requires an authenticated GraphQL call. Only the "300+ problems solved" figure from your résumé is used.                                                                                                          |
| **Twitter/X handle**                         | Guessed as `@MohitBarse` for the Twitter card `creator` field only | `seo.twitterHandle` in `portfolio.json`. Not rendered as a link anywhere — set it correctly or leave it; it only affects social-card attribution.                                                                                           |
| **Calendly link**                            | Empty, so the "Book a call" button is hidden                       | `NEXT_PUBLIC_CALENDLY_URL`                                                                                                                                                                                                                  | Set it and the button appears on the contact page automatically.                                                                                                                                                                                   |
| **Live demo URLs**                           | `"demo": null` on all 22 projects                                  | `src/data/projects.json`                                                                                                                                                                                                                    | None of your repositories advertise a deployed URL. Fill in `demo` for any that are hosted and a "Live demo" button appears on that case study.                                                                                                    |
| **Project screenshots / video previews**     | Replaced with generated architecture previews                      | `src/components/projects/project-card.tsx`                                                                                                                                                                                                  | Rather than ship placeholder image boxes, each card renders a deterministic diagram built from that project's `architecture` layers. If you add real screenshots to `public/images/projects/`, that component is the single place to swap them in. |

## 3. Two email addresses appeared in your sources

Your résumé lists **mohitbarse2230@gmail.com**; your Cowork account uses
**mohitbarse123@gmail.com**. The site uses the résumé address everywhere, on the
assumption that it is your professional contact. To switch, change
`profile.email` in `portfolio.json` — the navbar, contact page, `mailto:`
fallback, JSON-LD and RSS author field all read that one value.

## 4. Judgement calls I made — change any you disagree with

- **Skill levels (0-100).** Your résumé lists skills without proficiency. I
  assigned levels from evidence: what appears repeatedly across your 23 repos
  scores highest (Python 95, RAG 92, LLM Evaluation 90), things mentioned once
  score lower. All in `skillGroups` in `portfolio.json`.
- **"3+ years building."** Counted from the start of your B.Tech in 2022. Change
  in `stats`.
- **Project categories.** Eight categories derived from repo content, which
  become the filter tabs. Renaming a `category` value renames the tab.
- **Six featured projects.** Chosen for production-readiness and relevance to
  AI/ML roles: Agentic SOC, Self-Healing RAG, Guardrails Gateway, EvalForge,
  InsightFlow AI, Blood Group Prediction. Toggle `featured` to change.
- **Résumé projects vs. GitHub repos.** Your résumé's "Explainable Financial
  Intelligence Platform" has no matching public repository, so it is not listed
  as a project card; its themes are reflected in the AI stack (SHAP, fine-tuning)
  instead. "LLM Safety & Evaluation Framework" mapped to your public
  **LLM-EvalForge** and **LLM-Guardrails-Gateway** repos. If the financial
  platform is public under another name, add it to `projects.json`.
- **Blog articles.** Your résumé mentions no writing, so the five articles are
  written in your voice from your actual project work (self-healing RAG,
  CI-gated evaluation, the guardrails gateway, the multi-agent SOC, and MLOps
  lessons). **Read them before publishing** — they are technically accurate to
  your repositories, but they are your byline. Edit or delete files in
  `content/blog/` freely; routing, RSS and the sitemap follow automatically.
- **British spelling** used throughout ("specialising", "optimisation") to match
  Indian English convention. Search and replace if you prefer American spelling.

## 5. Verified working, no action needed

- All 22 GitHub repository URLs resolve (fetched live from the GitHub API).
- Star counts, descriptions and repo names are real, as of 31 July 2026.
- Your résumé PDF is served at `/Mohit_Barse_Resume.pdf` and linked from the
  navbar, hero and contact page.
- GitHub, LinkedIn and LeetCode profile links are the exact URLs you provided.
- The education timeline matches what you specified: Gaikwad Patil 2022-2026,
  St. Paul 2020-2022 (71.33%), Montfort 2007-2020 (65.75%).
