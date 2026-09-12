# SHOP MANUAL: COOPER ST LOGIC SHOP

## Pacific Pragmatism / Santa Cruz, CA

---

## 1.0 THE CORE ETHOS

We apply logic and hands-on craftsmanship to software development. We do not view software as "magic." We view it as a material to be worked on—like timber or steel.

The interface metaphor: the site is a **Technical Manual** resting on a **warm wooden workbench**.

- **The Workbench:** Organic, warm, scarred.
- **The Technical Manual:** Physical, readable, bound.
- **The Relationship:** The manual is a physical object centered on the bench. It does not stretch to fill the void; it holds the dimensions of a printed book.

**PHYSICALISM** is the governing constraint and the reason behind most decisions below. Pages have fixed dimensions. Paper does not grow. The book behaves like a bound object.

---

## 2.0 WORKBENCH PREPARATION

- **The Machine:** Eleventy (11ty) v2.
- **Runtime:** Node.js. CI builds on Node 22; nothing pins the version locally or on Netlify (see 7.0).
- **Setup:** `npm install`

---

## 3.0 ARCHITECTURE

```text
.eleventy.js              # 11ty config: src → _site, passthrough + watch targets
validate-content.js       # Build-time page overflow check (see 6.3)
netlify.toml              # Build command, publish dir, security headers
.htmlhintrc               # HTMLHint rules
.github/workflows/ci.yml  # Build + lint on every PR
src/
├── _data/navigation.json # Single source of truth for pages, tabs, TOC
├── _includes/
│   ├── base.njk          # The book: spread logic, tabs, headers, footers
│   ├── nav.njk           # Table of contents
│   └── filters.svg       # #inkBleed filter
├── assets/{css,img,js}   # Passthrough-copied verbatim
└── *.md                  # Page content
_site/                    # Build output (gitignored)
```

**Templating:** `.md` pages render with **Liquid**; `_includes/*.njk` render with **Nunjucks**. Nunjucks syntax in a Markdown file silently does nothing.

**Design tokens:** colors, fonts, the z-index scale, and tab spacing live in `variables.css`. Page dimension tokens (`--page-width`, `--page-height`, `--book-width`) live in `workbench.css`. Adjust the token, never a hardcoded value.

### 3.1 The Navigation Manifest

`src/_data/navigation.json` is the single source of truth. Change a slug, add a page, or rename a section and you edit that one file—`base.njk` and `nav.njk` consume it automatically.

Per item: `url`, `tabLabel` (bookmark tab), `tocLabel` (table of contents), `id`, `number` (two-digit TOC label).

**`id` is structural, not decorative.** It determines which side of the book a page lands on and which page it pairs with. Renumbering reshuffles the book. See 4.1.

---

## 4.0 THE LAYOUT ENGINE

### 4.1 The Physics of the Book

**Single page:** 600 × 800px (3:4). **Open spread:** 1200px.

**Page side from `id`:** odd = RIGHT (recto), even = LEFT (verso).

**Spread pairing:** a right page pairs with `id - 1`, a left page with `id + 1`. Spreads are therefore `(0,1)`, `(2,3)`, `(4,5)`—each `id` belongs to exactly one.

| Spread | Left page         | Right page                         |
| ------ | ----------------- | ---------------------------------- |
| (0, 1) | Table of contents | Shop                               |
| (2, 3) | Inventory         | Fabrication                        |
| (4, 5) | Personnel         | _unfilled — renders "coming soon"_ |

There is no page 0; `/shop/` is special-cased to render the TOC on its left page.

**Content is clipped, not scrolled.** `.guide-page` is `max-height: 800px; overflow: hidden`. Overflow is caught at build time by `validate-content.js` (6.3).

**Page depth:** each wrapper holds a `.page-stack` of five `.stack-leaf` divs (`aria-hidden`) carrying micro-rotations, to fan the book edge.

### 4.2 The Cover (`/`)

The home page is the closed cover, modeled on the Whole Earth Catalog.

- `data-state="open"` is absent from `<body>`; every open-book rule is scoped to that attribute.
- Background is `cover.webp`—dark cardstock. All cover text uses `--c-cover-text` with `mix-blend-mode: screen`, which brightens rather than darkens; that is what light ink on a dark board needs.
- The header is hidden. The footer is not: the cover carries a page number and a forward arrow to `/inventory/`.

### 4.3 Responsive States

| Viewport   | Layout                        | Page width    | Tabs    | Contents link       |
| ---------- | ----------------------------- | ------------- | ------- | ------------------- |
| ≥ 1251px   | Two-page spread (1200px book) | 600px each    | Visible | Navigates to /shop/ |
| 900–1250px | Single page (`.is-primary`)   | 600px         | Hidden  | Toggles TOC overlay |
| < 900px    | Single page, fluid            | 600px → 350px | Hidden  | Toggles TOC overlay |

We never squeeze two pages into a narrow viewport—that breaks the metaphor. We show one page at full scale, then let it recede.

Below 900px the cover, the inner pages, and their stack leaves all share one pair of formulas and must stay in sync:

```css
width: clamp(350px, calc(171.43px + 47.62vw), 600px); /* 600px @900 → 350px @375 */
height: clamp(467px, calc(228.57px + 63.49vw), 800px); /* 3:4 preserved */
```

At the 375px floor the page reaches 350px, leaving the workbench visible at the margins. The book's transform transition is `0.6s cubic-bezier(0.25, 1, 0.5, 1)`.

---

## 5.0 MATERIALITY

### 5.1 Protocol A: The Workbench

`desktop.webp` (3840 × 4500), painted `repeat-y` at a fixed `background-size: 1920px auto`. The bench does not rescale with the viewport—you scan down it, you do not zoom it.

`desktop.jpg` is its fallback, served through two competing declarations on `body`: a plain `url()` floor, then an `image-set()` that negotiates on MIME type. An engine that cannot parse `image-set()` discards the second declaration as a syntax error and keeps the first. **This cannot be expressed with a custom property**—a declaration containing `var()` is validated only after substitution, so an unsupported `image-set()` would leave `background-image` unset rather than falling back. Both declarations stay literal.

### 5.2 Protocol B: Paper

**Textures are baked, not composited.** `cover.webp`, `paper-left.webp`, and `paper-right.webp` each carry the paper base color, grain, and spine shading as a flat image. The browser should display an image, not solve a rendering equation on every scroll frame.

- Right pages use `paper-right.webp` directly.
- Left pages use `paper-left.webp` with `transform: scaleX(-1)`, so the baked spine shading falls toward the center gutter.
- Stack leaves reuse the same textures at reduced opacity.
- Inner edges are clipped with `clip-path` for a clean bound spine.

The book casts a three-layer `box-shadow` onto the bench: contact, ambient, and distance.

### 5.3 Protocol C: Ink

`#inkBleed` (in `filters.svg`) is the only filter, and its scope is a rule rather than a preference:

- **`h1`, `h2`, `.guide-header`, the C-icon:** `filter: url(#inkBleed)` plus a blend mode. Sparse, high-impact elements where the per-pixel cost is affordable.
- **Body text (`p`, `h3`–`h6`, `li`):** `color: #1a1a1a` at `opacity: 0.9`. **No filter, no blend mode.** Body text dominates the DOM; filtering it costs scroll performance on mid-range phones for no visible gain.

Interior pages blend `multiply`—dark ink on light paper. The cover flips to `screen`.

**Do not extend `#inkBleed` to body copy.**

### 5.4 Protocol D: Navigation

#### Bookmark tabs

- Vertical position is fixed per page: `top: calc(var(--tab-start) + var(--tab-height) * var(--tab-index))`, where `--tab-index` is `id - 1`, set inline by `base.njk`.
- Side follows the spread: ids at or before the spread's left page sit on the LEFT (turned), ids at or after its right page sit on the RIGHT (unread).
- The two pages currently on screen render as inert `<span>` tabs; the rest render as `<a>`.
- Hidden below 1250px, where they would stick out of a single page.

#### Contents link (C-icon + label)

Present in every header. Above 1250px it navigates to `/shop/`. At or below 1250px it toggles `data-flip="toc"` on `<body>`, fading in a `.toc-overlay`—a full left-page replica with its own working contents link—over the current page. No navigation occurs, so the reader keeps their place, the way you would thumb to an index and back. The overlay sits in both wrappers on every page and is `display: none` above 1250px; the flip state resets when the viewport crosses back up.

The C-icon is inline SVG with `stroke="currentColor"` so it inherits link color on hover. An `<img>` could not.

#### Footer arrows and swipe

The footer is a three-column grid: previous arrow and number, copyright, number and next arrow. An arrow renders only when a neighboring `id` exists. Above 1250px the two arrows facing the gutter—the left page's next, the right page's prev—are hidden: both leaves of that spread are already on screen, so following them reloads the same view. Only the outer arrows turn a leaf. Below 1250px one page is visible at a time and both of its arrows are shown. `clamp.js` maps horizontal swipes—over 50px horizontal, under 50px vertical, so scrolling never turns a page—onto the _visible_ footer arrows, so touch navigation obeys the same rules as the arrows and behaves correctly under the TOC overlay.

Breakpoints are read with `window.matchMedia`, not `resize` listeners; the handler fires on breakpoint crossings only.

### 5.5 Protocol E: Entry

`@keyframes settleBook`: `translateY(10px) rotateX(2deg)` to rest, `1s cubic-bezier(0.25, 1, 0.5, 1)`.

---

## 6.0 FABRICATION

### 6.1 Commands

```bash
npm start                      # dev server at localhost:8080, live reload
npm run build                  # prebuild runs validate-content.js first
npm run validate               # content bounds only
npm run format                 # Prettier
npm run build && npm run lint  # HTMLHint reads _site/, so build first
```

### 6.2 CI

`.github/workflows/ci.yml` runs `npm ci`, `npm run build`, and `npm run lint` on every push to `main` and every PR against it—Node 22, superseded runs cancelled. Because `prebuild` runs the content check, page overflow fails CI too.

### 6.3 Content Validation

Paper has fixed dimensions, so content must fit:

800px page − 128px vertical padding − ~100px header ≈ **572px of usable content**

`validate-content.js` estimates rendered height from the Markdown and fails the build on overflow, warning at 90%. The estimate is rough—assumed line heights per element—so confirm in the browser with `npm start`. When a page overflows, cut it or split it. Do not raise the page height.

---

## 7.0 SHIPPING

Netlify runs `npm run build` and publishes `_site`. `netlify.toml` sets `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and long-lived immutable caching.

The Node version is unpinned—no `.nvmrc`, no `engines`—so Netlify uses its own default, which can drift from CI's Node 22.

---

## 8.0 STANDARD OPERATING PROCEDURES

### SOP-01: Updating content

Edit the relevant `src/*.md`. Prefer Markdown for structure; inline HTML only where the layout requires it, as the cover does for centering and `.cover-footer`. Run `npm run validate`. Commit and push; Netlify handles the rest.

### SOP-02: Adding a page

1. Add an item to `src/_data/navigation.json` with `url`, `tabLabel`, `tocLabel`, the next `id`, and `number`.
2. Create `src/<slug>.md` with `layout: base.njk` and a `title`.
3. Mind the parity: an odd `id` lands the page on the right, an even `id` on the left, and it pairs with its neighbor. Adding to an unfilled spread completes it; adding past one starts a new spread.
4. The TOC, bookmark tabs, spread pairing, and footer arrows all generate themselves.

### SOP-03: Imagery

Desaturate, threshold to high contrast, apply a halftone or dither, then save an optimized WebP into `src/assets/img/`.

---

## 9.0 LICENSE

Source is GPL-3.0. Under GPLv3 §7 the name "COOPER ST LOGIC SHOP", `icon-c.svg`, and `favicon-*.svg` are All Rights Reserved and excluded—a fork must replace them with its own assets. Full terms in [LICENSE](./LICENSE); the summary for redistributors is in [README.md](./README.md).

---

© 2026 Dylan Webster. Santa Cruz, California.
