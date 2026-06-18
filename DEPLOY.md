# Deploying AKRA

This is a fully static site (Next.js static export). `npm run build` generates a
self-contained `out/` folder that can be hosted on any static host. No Node
server, no database.

---

## Option A — Hostinger (served at the domain root)

1. Build locally:
   ```bash
   npm install
   npm run build
   ```
2. Open the generated `out/` folder and upload **everything inside it** (not the
   folder itself) into your `public_html`:
   - hPanel → File Manager → `public_html` → Upload, or
   - FTP (e.g. FileZilla) into `public_html`.
   Keep the hidden `.nojekyll` file (harmless on Hostinger).
3. Visit your domain.

To update later: run `npm run build` again and re-upload `out/`.

> Hostinger plans with Node.js support can instead run the live server
> (`npm run build` then `npm start`), but the static upload above is simpler and
> works on every plan.

---

## Option B — GitHub Pages (served at username.github.io/akra-residences)

Automated by the included workflow at `.github/workflows/deploy.yml`.

1. Create a GitHub repository named **akra-residences** and push this project to
   the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub
   Actions**.
3. Every push to `main` builds and deploys automatically. The workflow sets the
   base path to `/akra-residences` (your repo name) so CSS, JS and links resolve
   correctly on the subpath.
4. Your site goes live at `https://<your-username>.github.io/akra-residences/`.

If you rename the repo, the base path follows the new name automatically — no
edits needed.

### Custom domain on GitHub Pages
A custom domain is served at the root, so the subpath is no longer needed. Add
your domain in **Settings → Pages**, then in the workflow remove the
`PAGES_BASE_PATH` env line from the build step (or set it to an empty string).

---

## Base path, explained

- **Root hosting** (Hostinger `public_html`, a custom domain, or
  `username.github.io`): `npm run build` → assets served from `/`.
- **GitHub Pages project subpath**: set `PAGES_BASE_PATH="/akra-residences"`
  before building. The Actions workflow does this for you.

---

## Before a real launch

- **Contact form:** it currently validates and shows a success message but does
  not deliver emails. Wire up a static-friendly service (Web3Forms or Formspree)
  or Hostinger email to actually receive enquiries.
- **Images:** they currently load from Unsplash. Replace them with your own
  photography in `components/images.ts` so you control the assets and licensing.
