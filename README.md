# Futurist Kowus

Website for Futurist Daniel Owusu-Koranteng, built with [Next.js](https://nextjs.org) 16 (App Router), React 19 and Tailwind CSS 4. It has a public site and a password-protected dashboard for writing blog articles. There is no database.

## Pages

| Route | What it is |
|---|---|
| `/` | Home |
| `/about` | About |
| `/blogs` | Article list |
| `/blogs/[slug]` | Article page |
| `/contact` | Contact |
| `/admin` | Dashboard: create, edit and delete articles, upload images |

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard login is at `/admin/login`.

Other scripts: `npm run build`, `npm start`, `npm run lint`.

> This project uses a version of Next.js with breaking changes. See `AGENTS.md` and `node_modules/next/dist/docs/` before changing framework-level code.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `ADMIN_USERNAME` | Yes | Dashboard username |
| `ADMIN_PASSWORD` | Yes | Dashboard password |
| `ADMIN_SECRET` | Yes | 16+ random characters, used to sign the login cookie |
| `GITHUB_TOKEN` | On Vercel | Fine-grained token with Repository > Contents: Read and write |
| `GITHUB_REPO` | On Vercel | `owner/name` of this repository |
| `GITHUB_BRANCH` | No | Branch to commit to (default `main`) |

Restart the dev server after changing `.env.local`.

## How content is stored

- Articles live in `content/blogs.json`.
- Uploaded images live in `content/uploads/` and are served from `/api/uploads/<uuid>.<ext>`.
- Uploads accept JPG, PNG and WebP, up to 4MB.
- Static site images (hero, team, gallery) are in `public/images/`.

Where the dashboard saves depends on the environment:

- **Locally (no `GITHUB_TOKEN` / `GITHUB_REPO`):** it writes straight to the `content/` folder.
- **On Vercel:** the disk is read-only, so the dashboard commits to your GitHub repo through the GitHub API. Vercel then redeploys from the push. Without the GitHub variables, saving and uploading fail with "Saving isn't set up on this host yet".

Visitors read the copy bundled with the deployed site, so new articles and images appear publicly only after the redeploy finishes. The dashboard always reads the newest copy.

## Project structure

```
content/            blogs.json and uploads (the "database")
public/images/      static images
src/app/(site)/     public pages
src/app/admin/      login and dashboard
src/app/api/        login, logout, blog CRUD, upload, image serving
src/components/     UI grouped by page (home, about, blog, contact, layout, admin)
src/lib/            site config, auth, blog storage, GitHub client
```

Edit contact details and nav links in `src/lib/site.ts`.

## Deploying to Vercel

1. Import the repository in Vercel.
2. Add all the environment variables above, including the three GitHub ones.
3. Deploy. Each article or image saved from the dashboard creates a commit and triggers a new deploy.
