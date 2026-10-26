# motocoreerp.com

Marketing website for MotoCore (MotoCore Bike, Parts, Workshop, Recon-Lite and Car), with a blog and a small admin at `/admin`.

- **Stack:** Vite + React 19, Tailwind 4. Every page is pre-rendered to static HTML at build time (`scripts/prerender.mjs`) so search engines get full text, titles, structured data and a sitemap.
- **Hosting:** Vercel. Every push to `main` deploys production; pull requests get preview deployments.
- **API:** Vercel functions in `api/` (contact form and the admin).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 (client-only; /api needs Vercel)
npm run build      # client + SSR build + pre-render into dist/
npm run lint       # TypeScript check
```

## Pages

| What | Where |
| --- | --- |
| Routes, titles, descriptions, hreflang | `src/seo/routes.ts` |
| Product page content (English + Nepali), product list, home FAQ | `src/seo/content.ts` |
| Privacy Policy and Terms | `src/seo/legal.ts` |
| Head tags and JSON-LD | `src/seo/head.ts` |
| Product screenshots | `src/assets/products/*.webp` |
| Store links for the MotoCore Bike app | `APP_STORES` in `src/seo/content.ts` |
| Social profile links | `SOCIAL` in `src/seo/content.ts` |

## Blog

Posts are Markdown files in `src/content/blog/<url-slug>.md` (see `_template.md`). Write them in the admin, or add the
file by hand. Each post becomes `/blog/<url-slug>`, is added to the sitemap and gets article structured data. Raw HTML in
posts is shown as text, and only http(s), mailto, tel, site-relative and `#` links are kept.

## Admin (`/admin`)

Sign in to read website enquiries and to write, publish and delete blog posts.

- **Blog:** saving a post commits the Markdown file (and any uploaded image under `public/images/blog/`) to this repository on
  `GITHUB_BRANCH`. That commit triggers a Vercel deployment, so a published post is live in about 1–2 minutes.
- **Enquiries:** the contact, demo and early-access forms still email the team and sync to the MotoCore platform as before;
  when Upstash Redis is connected they are also stored for the admin (kept for 2 years, as the Privacy Policy says).

### Setup on Vercel (Project → Settings → Environment Variables)

| Variable | Value |
| --- | --- |
| `ADMIN_USERS` | One entry per admin, comma separated. Make each with `node scripts/admin-user.mjs you@example.com` (asks for the password; only a salted scrypt hash is stored). |
| `ADMIN_SESSION_SECRET` | A random string of at least 32 characters, e.g. `openssl rand -base64 48`. Changing it signs everyone out. |
| `GITHUB_TOKEN` | Fine-grained GitHub token, **only** this repository, permission **Contents: Read and write**. |
| `GITHUB_REPO` | Optional, default `Codearray1/motocore-erp-website`. |
| `GITHUB_BRANCH` | Optional, default `main`. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Set automatically when you add **Storage → Upstash for Redis** to the project. |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ERP_API_URL` | Contact form email and lead sync (unchanged). |

Redeploy after changing variables. Sessions last 12 hours; 8 failed sign-ins from one address block sign-in for 15 minutes.
