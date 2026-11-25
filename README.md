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

Drop the photo in `src/assets/photos/` with a descriptive filename, then use
the `Photo` component. It resizes and compresses the image, and links it to a
larger version so readers can click to enlarge.

```astro
---
import Photo from '../components/Photo.astro';
import myPhoto from '../assets/photos/my-photo.jpg';
---
<Photo class="inline" src={myPhoto} alt="Describe what's in the photo">
  A plain caption: what it is and when it was taken.
</Photo>
```

For several photos side by side, wrap them in
`<div class="photo-row cols-3">` (or `cols-2`). In journal entries, plain
markdown images work: `![alt text](../../assets/photos/my-photo.jpg)`.

Captions should state only what is known: what the photo shows and the date.
Photos staged in the root `photos/` folder are git-ignored and never published.

## Deploying

The site is live at **https://windrose.farm** and deploys itself: push to
`main` and the workflow in `.github/workflows/deploy.yml` builds and
publishes it. Nothing else to run.

Setup already done (recorded here in case it ever needs rebuilding):

- Repo: `github.com/ClockworkCommons/windrose-farm` (public -- GitHub Pages
  on a private repo requires a paid plan)
- **Settings -> Pages -> Source** is set to **GitHub Actions**. If this is
  ever reset to "Deploy from a branch", every deploy fails at the last step
  with the build still passing.
- **Settings -> Pages -> Custom domain** is `windrose.farm`
- DNS at Namecheap: four `A` records on `@` pointing to `185.199.108.153`
  through `185.199.111.153`, plus a `CNAME` on `www` to
  `clockworkcommons.github.io.`
- `public/CNAME` holds the domain. **Do not delete it** -- an
  Actions-based deploy that omits it drops the custom domain.

### A note on preview URLs

`astro.config.mjs` sets `site` to `https://windrose.farm` with no `base`,
so pages reference assets from the domain root. That means the
`clockworkcommons.github.io/windrose-farm/` address renders unstyled and
without photos. That is expected, not a bug -- use `npm run dev` locally
or the real domain.

## Structure

- `src/pages/` — the pages (home, story, farm, land, seasons, journal, 404) plus the RSS feed and sitemap
- `src/content/journal/` — journal entries (markdown)
- `src/assets/photos/` — property photography (optimized at build time)
- `src/components/` — header, footer, the `Photo` component, and the windrose compass mark
- `src/styles/global.css` — the entire design system (colors, type, layout)
- `public/` — favicon and any static files/photos

## Deploying

The build output in `dist/` is plain static files — deployable to any static
host (Cloudflare Pages, Netlify, GitHub Pages) with the `windrose.farm`
domain pointed at it. Build command: `npm run build`, output dir: `dist`.
