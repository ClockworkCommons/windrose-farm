# Windrose Farm — windrose.farm

The website for Windrose Farm, a family homestead and regenerative farm in
Heber, Arizona. *Growing in Nature's Direction.*

Built with [Astro](https://astro.build) as a fully static site — no database,
no CMS, nothing to maintain but words and pictures.

## Working on the site

```sh
npm install       # once
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build → dist/
```

## Adding a journal entry

Create a new markdown file in `src/content/journal/`, e.g.
`first-apple-blossoms.md`:

```markdown
---
title: "First apple blossoms"
date: 2027-04-20
phase: "Phase 3 · First plantings"   # optional
summary: "One or two sentences shown on the journal index and homepage."
---

The entry itself, in plain markdown...
```

That's it — the journal index and homepage pick it up automatically.

## Adding photos

Drop the photo in `src/assets/photos/` with a descriptive filename, then
reference it with Astro's `<Image>` component so it gets resized and
compressed automatically:

```astro
---
import { Image } from 'astro:assets';
import myPhoto from '../assets/photos/my-photo.jpg';
---
<figure class="snapshot">
  <Image src={myPhoto} alt="Describe what's in the photo" widths={[640, 1024, 1600]}
         sizes="(max-width: 72rem) 100vw, 66ch" />
  <figcaption>An optional caption.</figcaption>
</figure>
```

Two styles are available: `.snapshot` for a photo inside an article column,
and `.photo-band` for a full-width edge-to-edge band (see the homepage).
Put photos in `src/assets/`, not `public/` — only `src/assets/` gets
optimized.

## Deploying (GitHub Pages)

The site deploys itself: push to `main` and the workflow in
`.github/workflows/deploy.yml` builds and publishes it.

One-time setup:

1. Create a GitHub repo and push this folder to it.
2. In the repo, go to **Settings -> Pages** and set **Source** to
   **GitHub Actions** (not "Deploy from a branch").
3. Still on that page, set the **Custom domain** to `windrose.farm`
   and tick **Enforce HTTPS** once the certificate finishes issuing
   (it can take a few minutes to an hour).
4. At the domain registrar, point DNS at GitHub:

   | Type  | Name  | Value |
   |-------|-------|-------|
   | A     | `@`   | `185.199.108.153` |
   | A     | `@`   | `185.199.109.153` |
   | A     | `@`   | `185.199.110.153` |
   | A     | `@`   | `185.199.111.153` |
   | CNAME | `www` | `<username>.github.io` |

`public/CNAME` keeps the custom domain attached across deploys -- leave
it in place.

Note: GitHub Pages on a **private** repo requires a paid GitHub plan. On
the free plan the repo must be public, which means the site source
(text and photos) is publicly readable. That is normal for a static
site, but worth knowing before pushing.

## Structure

- `src/pages/` — the pages: home, story, farm, land, journal, 404
- `src/content/journal/` — journal entries (markdown)
- `src/assets/photos/` — property photography (optimized at build time)
- `src/components/` — header, footer, and the windrose compass mark
- `src/styles/global.css` — the entire design system (colors, type, layout)
- `public/` — favicon and any static files/photos

## Deploying

The build output in `dist/` is plain static files — deployable to any static
host (Cloudflare Pages, Netlify, GitHub Pages) with the `windrose.farm`
domain pointed at it. Build command: `npm run build`, output dir: `dist`.
