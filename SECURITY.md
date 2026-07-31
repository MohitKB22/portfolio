# Security Policy

## Supported versions

The `main` branch is the only supported version; it is what is deployed.

## Reporting a vulnerability

Please do **not** open a public issue for a security vulnerability.

Email <mohitbarse2230@gmail.com> with:

- A description of the issue and its impact
- Steps to reproduce
- Any suggested remediation

You can expect an acknowledgement within 72 hours and a fix or mitigation plan
within seven days for anything exploitable.

## Scope

This is a static-first marketing site. The realistic surface area is:

- The `/api/contact` route (input validated with Zod; no persistence, no secrets in the response)
- The `/api/og` route (renders text from query parameters into an image)
- Third-party scripts: Vercel Analytics, Vercel Speed Insights, EmailJS

## Handling of secrets

No secret is required for the site to build or run. `GITHUB_TOKEN` is optional,
server-side only, and used solely to raise the GitHub API rate limit. EmailJS
keys are public by design (they are browser-scoped and domain-restricted in the
EmailJS dashboard) — restrict them to your deployed domain there.
