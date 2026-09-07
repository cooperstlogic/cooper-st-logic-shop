# CLAUDE.md

Eleventy 2.x static site for COOPER ST LOGIC SHOP. No framework, no client-side
router — one stylesheet, one layout, five pages.

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
src/_includes/    base.njk (layout), nav.njk (TOC), filters.svg (SVG defs)
src/_data/        navigation.json — drives nav, tabs, and spread pairing
src/assets/       passthrough-copied verbatim to _site/assets/
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
- Use the tokens in `src/assets/css/variables.css` — especially the `--z-*`
  scale and `--tab-*` values — rather than raw z-indexes or magic offsets.

## Licensing

Code is GPL-3.0. Under GPLv3 §7, the "COOPER ST LOGIC SHOP" name,
`icon-c.svg`, and `favicon-*.svg` are All Rights Reserved and excluded — don't
copy them into derived work or examples.
