# Deployment

Every path below produces the same site. Vercel is recommended because the
project uses Next.js server components, image optimisation and the `next/og`
runtime, all of which work there with zero configuration.

---

## 0. Push to GitHub first

```bash
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/MohitKB22/portfolio.git
git push -u origin main
```

---

## 1. Vercel (recommended)

### Dashboard

1. Go to <https://vercel.com/new> and import the repository.
2. Framework preset is detected as **Next.js** — leave the build settings alone.
3. Add environment variables (see the table below). At minimum set
   `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Deploy.

### CLI

```bash
npm i -g vercel
vercel login
vercel            # preview deployment
vercel --prod     # production deployment
```

### What you get automatically

- Production deploys on every push to `main`
- Preview deployments with a unique URL for every pull request
- Vercel Analytics and Speed Insights (already wired in `src/app/layout.tsx`)
- Region `bom1` (Mumbai) — set in `vercel.json`, change if your audience is elsewhere

### Custom domain

Project → Settings → Domains → add your domain, then follow the DNS
instructions. **After adding it, update `NEXT_PUBLIC_SITE_URL` to the custom
domain and redeploy** — the sitemap, RSS feed, canonical URLs and OpenGraph tags
are all derived from that variable.

---

## 2. Netlify

`netlify.toml` is included and configures the official Next.js runtime plugin.

```bash
npm i -g netlify-cli
netlify login
netlify init      # link the repo
netlify deploy --prod
```

Set the same environment variables under Site configuration → Environment
variables.

---

## 3. Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git.
2. Build command: `npx @cloudflare/next-on-pages@1`
3. Build output directory: `.vercel/output/static`
4. Add a compatibility flag: `nodejs_compat` (Settings → Functions → Compatibility flags, for both Production and Preview).
5. Add the environment variables.

Local verification of the Cloudflare build:

```bash
npx @cloudflare/next-on-pages@1
npx wrangler pages dev .vercel/output/static --compatibility-flag=nodejs_compat
```

---

## 4. Docker (self-hosted)

The Dockerfile is a three-stage build producing a Next.js standalone server on
`node:22-alpine`, running as a non-root user with a healthcheck.

```bash
# Build
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com -t mohit-portfolio .

# Run
docker run -p 3000:3000 --env-file .env.local mohit-portfolio
```

Or with Compose:

```bash
cp .env.example .env
docker compose up -d --build
docker compose logs -f
docker compose down
```

Behind a reverse proxy (nginx example):

```nginx
server {
  listen 443 ssl http2;
  server_name your-domain.com;

  location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade $http_upgrade;
    proxy_set_header   Connection 'upgrade';
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## 5. Static export (GitHub Pages, S3, any static host)

The site uses server components and dynamic OG image generation, so a fully
static export requires two changes:

1. Add `output: 'export'` to `next.config.ts`.
2. Delete `src/app/api/` and set a static OG image in `src/lib/seo.ts`
   (`image: '/og.png'`), because route handlers cannot be exported.

```bash
npm run build     # emits ./out
```

Then publish `out/` to any static host. You lose live GitHub stats and dynamic
OG images; everything else works.

---

## Environment variables

| Variable                          | Required | Where   | Purpose                                                        |
| --------------------------------- | -------- | ------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | **Yes**  | Build   | Canonical URL for sitemap, RSS, canonical tags and OG metadata |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | No       | Build   | EmailJS service — enables real form delivery                   |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | No       | Build   | EmailJS template                                               |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | No       | Build   | EmailJS public key                                             |
| `GITHUB_TOKEN`                    | No       | Runtime | Raises the GitHub API rate limit for the live stats widget     |
| `NEXT_PUBLIC_CALENDLY_URL`        | No       | Build   | Shows a "Book a call" button on the contact page               |
| `DOCKER_BUILD`                    | No       | Build   | Set to `true` only in Docker builds; enables standalone output |

`NEXT_PUBLIC_*` values are inlined at build time — changing one requires a
rebuild, not just a restart.

### Setting up EmailJS

1. Create an account at <https://dashboard.emailjs.com>.
2. Add an email service (Gmail, Outlook, or SMTP) and copy the **Service ID**.
3. Create a template using these variables: `from_name`, `from_email`,
   `company`, `subject`, `message`, `to_name`. Copy the **Template ID**.
4. Account → General → copy the **Public Key**.
5. Account → Security → add your production domain to the allowed list.

Without these three values the form still works: `/api/contact` validates the
submission server-side and returns a pre-filled `mailto:` link.

---

## Post-deployment verification

```bash
SITE=https://your-domain.com

curl -sI  $SITE | head -1                       # expect HTTP/2 200
curl -s   $SITE/sitemap.xml | head -5           # expect <urlset>
curl -s   $SITE/robots.txt                      # expect Sitemap: line
curl -s   $SITE/rss.xml    | head -5            # expect <rss version="2.0">
curl -sI  $SITE/api/og | grep content-type      # expect image/png
curl -sI  $SITE/Mohit_Barse_Resume.pdf | head -1
```

Then check manually:

- [ ] Home page hero, typing animation and WebGL neural field render on desktop
- [ ] Project filter and search work; every case study opens
- [ ] Blog post renders with highlighted code and a working table of contents
- [ ] Contact form shows validation errors, then sends successfully
- [ ] Resume downloads
- [ ] Social preview renders — test with <https://cards-dev.twitter.com/validator> and the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Structured data validates — <https://search.google.com/test/rich-results>
- [ ] Lighthouse on mobile and desktop
- [ ] Keyboard-only navigation reaches every interactive element
- [ ] `prefers-reduced-motion` disables animation (macOS: Reduce Motion; Chrome DevTools → Rendering → Emulate CSS media)

### Submit to search engines

1. [Google Search Console](https://search.google.com/search-console) → add
   property → verify by DNS or HTML tag → submit `sitemap.xml`.
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) → import from Google
   Search Console.
