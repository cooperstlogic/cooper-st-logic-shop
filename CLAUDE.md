# CLAUDE.md

Eleventy 3.x static site for COOPER ST LOGIC SHOP. No framework, no client-side
router — one stylesheet, two layouts, six bound pages plus the fold-out plates.

Detailed documentation lives in [shop-manual.md](./shop-manual.md); read the
relevant section before making structural or visual changes.

## Commands

```bash
npm start     # clean + eleventy --serve at localhost:8080 (live reload)
npm run build # clean + validate + eleventy  (prebuild runs validate-content.js)
npm run lint  # htmlhint over _site/**/*.html — requires a build first
npm run format
```

CI (`.github/workflows/ci.yml`) runs `npm run build` then `npm run lint`.
Netlify deploys `_site/` from `npm run build`.

## Structure

```
src/*.md          page content (front matter: layout: base.njk, title)
src/annex.md      page 5, ANNEX — the hand-written list of plates
src/annex/        the plates themselves (annex.json sets layout for the directory)
src/_includes/    base.njk + annex.njk (layouts), nav.njk (TOC), filters.svg
src/_data/        navigation.json — drives nav, tabs, and spread pairing
src/assets/       passthrough-copied verbatim to _site/assets/
src/assets/docs/  PDFs served under a noindex header
```

## Things that will bite you

- **Markdown pages render with Liquid, `base.njk` with Nunjucks.** Nunjucks
  syntax in a `.md` file silently does nothing.
- **Pages are a fixed 600×800px.** Content that overflows is a build failure,
  not a scroll — `validate-content.js` estimates rendered height and exits
  non-zero via `prebuild`. Trim content or split the page.
- **`navigation.json` ids drive the book layout.** Odd id = right page (recto),
  even = left (verso); adjacent ids form a spread, and `id - 1` sets the
  bookmark tab's vertical slot. Renumbering reshuffles the whole book.
- Adding a page means: `src/<name>.md` + an entry in `navigation.json` with the
  next `id`/`number`. Nothing is auto-discovered.
- **The annex is a page; the plates are not.** `src/annex.md` is page 5, a
  bound leaf on `base.njk` listing the plates. `src/annex/*.md` are the plates,
  on `annex.njk`: fold-out sheets the width of the open book, creased at the
  gutter and at every page height, with no tabs, no spread and no 800px cap.
  Never point a plate at `base.njk`: that layout derives everything from a
  `navigation.json` id, and a page without an entry resolves to
  `currentId = 0`, rendering silently and wrongly beside THE SHOP. Plates sit
  in a subdirectory so `validate-content.js` (non-recursive over `src/`) leaves
  their height alone.
- **Adding a plate means two places**, like adding a page: the file in
  `src/annex/` and a row in `src/annex.md`'s list. The list is hand-written
  so the validator can weigh page 5; nothing generates it. The real limit is
  the phone leaf (~five rows; a wrapping title costs two), which the validator
  does not model — check under 400px. URLs are the plate's filename under
  `/annex/`, and links to them have been sent out — don't rename.
- **The annex is unlisted, not private.** Page 5 sets `robots` in its front
  matter (a `base.njk` opt-in), `annex.njk` carries the same meta, and
  `netlify.toml` sends `X-Robots-Tag` for `/annex/*` and `/assets/docs/*` —
  deliberately in place of a robots.txt `Disallow`, which would publish the
  very paths it hides. Plate titles still appear in `/personnel/`'s HTML,
  because a spread renders both leaves.
- Use the tokens in `src/assets/css/variables.css` — especially the `--z-*`
  scale and `--tab-*` values — rather than raw z-indexes or magic offsets.

## Licensing

Code is GPL-3.0. Under GPLv3 §7, the "COOPER ST LOGIC SHOP" name,
`icon-c.svg`, and `favicon-*.svg` are All Rights Reserved and excluded — don't
copy them into derived work or examples.
