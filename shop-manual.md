# SHOP MANUAL: COOPER ST LOGIC SHOP

## Pacific Pragmatism / Santa Cruz, CA

STATUS: ACTIVE
VERSION: 3.0.0 (Redesign)

---

## 1.0 THE CORE ETHOS

We operate at the intersection of high-level reasoning and hands-on craftsmanship. We do not view software as "magic." We view it as a material to be worked on—like timber or steel.

The Interface Metaphor: The site is a "Field Guide" (Vellum) resting on a "Warm Wooden Workbench" (Organic).

- **The Workbench:** Organic, warm, scarred.
- **The Field Guide:** Physical, readable, bound.
- **The Relationship:** The Guide is a physical object centered on the bench. It does not stretch to fill the void; it maintains the dimensions of a printed book.

This repository is itself an instantiation of a Digital Workshop.

---

## 2.0 WORKBENCH PREPARATION

### 2.1 Required Tooling

- **Runtime:** Node.js v18+ (The Power Source).
- **The Machine:** **Eleventy (11ty)**. We utilize a Static Site Generator (SSG) to assemble the "Inventory" and "Fabrication" catalogs from raw data.
- **Version Control:** Git.

### 2.2 First-Time Setup (Fitting Out)

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/cooper-st-logic-shop.git
   cd cooper-st-logic-shop
   ```

2. **Install Shop Tools:**

   ```bash
   npm install
   ```

   _(Installs @11ty/eleventy, Prettier, HTMLHint, and local server utilities)_

---

## 3.0 ARCHITECTURE (The 11ty Structure)

We separate "Raw Materials" (Source) from "Finished Goods" (Output).

```text
cooper-st-logic-shop/
├── .eleventy.js           # The Machine Config
├── .gitignore             # Shop Hygiene
├── netlify.toml           # Shipping Label
├── package.json           # Inventory
├── README.md              # Shop Manual (This Document)
├── src/                   # RAW MATERIALS
│   ├── _data/             # Global Site Data (Single Source of Truth)
│   │   └── navigation.json  # Navigation manifest (pages, tabs, TOC)
│   ├── _includes/         # Layouts & Partials
│   │   ├── base.njk       # The Field Guide Frame (HTML5 Shell)
│   │   ├── nav.njk        # Table of Contents (Generated from navigation.json)
│   │   └── filters.svg    # SVG Filter Definitions
│   ├── assets/
│   │   ├── css/           # The Materiality Engine
│   │   │   ├── reset.css
│   │   │   ├── variables.css  # Design tokens: colors, z-index scale, tab spacing
│   │   │   └── workbench.css
│   │   ├── img/           # SVGs & Textures
│   │   │   ├── icon-c.svg
│   │   │   ├── paper-grain.svg
│   │   │   ├── desktop.webp
│   │   │   └── desktop.jpg
│   │   └── js/            # Client Logic (Mobile Drawer)
│   │       └── clamp.js
│   ├── index.md           # [COVER]
│   ├── shop.md            # [01 // THE SHOP]
│   ├── inventory.md       # [02 // INVENTORY]
│   ├── fabrication.md     # [03 // FABRICATION]
│   └── personnel.md       # [04 // PERSONNEL]
└── _site/                 # FINISHED GOODS (Gitignored)
```

### 3.1 Data Architecture (The Single Manifest)

All navigation data is centralized in `src/_data/navigation.json`. This file is the **single source of truth** for:

- **Bookmark Tabs:** Label, URL, and positioning index for the physical tab markers.
- **Table of Contents:** Full page names and section numbers displayed on the left page.
- **Tab Spacing Configuration:** `tabSpacing.startOffset` and `tabSpacing.itemHeight` define the vertical rhythm.

**Rule:** If you change a page slug, add a page, or rename a section—edit **one file**: `navigation.json`. The templates (`base.njk`, `nav.njk`) consume this data automatically via Eleventy's global data system.

```json
{
  "items": [
    { "url": "/shop/", "tabLabel": "SHOP", "tocLabel": "THE SHOP", "id": 1, "number": "01" },
    ...
  ],
  "tabSpacing": { "startOffset": 100, "itemHeight": 70 }
}
```

---

## 4.0 THE LAYOUT ENGINE (The Field Guide)

We treat the content as a physical "Field Guide" book with specific dimensions, resting on a wooden surface.

### 4.1 The Physics of the Book

- **The Cover (Home Page `/`):** The home page behaves as the closed cover of the Field Guide.
  - **Content:** Centered title "COOPER ST LOGIC SHOP" with "FIELD GUIDE VERSION 3.0" and a link to "OPEN FIELD GUIDE".
  - **State:** `data-state` attribute is NOT set to "open" on the body element.
  - **Visuals:** Width restricted to single page (~600px) with the inner gutter shadow removed to simulate a flat cover board.
- **The Open Book:** When navigating to any page other than `/`, the guide "flips" open to a two-page spread.
  - **State:** `data-state="open"` is set on the body element via Nunjucks conditional logic.
  - **Layout:** `.field-guide-book` container uses `display: flex` and expands to ~1100px.
- **Left Page Logic:**
  - **On `/shop/` (The Shop):** Displays the Table of Contents (`nav.njk`) and copyright footer.
  - **On Other Pages:** Displays contextual "Field Notes" content defined in the page's front matter as `left_page_content`.
  - **Example:** Inventory page shows "Stockroom Access" rules, Personnel shows an ID card.
- **Right Page:** Always contains the primary page content (Markdown body).
  - **Spine Shadow:** When open, a deep linear gradient shadow appears on the inner left edge to simulate depth in the gutter.

- **Bookmark Tabs:** Navigation is handled via realistic bookmark tabs sticking out from the book edges.
  - **Position Logic:** Tab positions are calculated via CSS: `top: calc(var(--tab-start) + (var(--tab-height) * var(--tab-index)))`. Each tab receives a `--tab-index` custom property from the template loop, ensuring positions are derived from variables—not hardcoded magic numbers.
  - **Stability:** Tabs maintain their vertical position whether they appear on the left or right side, simulating physical tabs attached to specific pages.
  - **Layering:** Tabs use the `--z-tab` variable (default: 1), positioned between the page stack (`--z-stack`) and the primary page content (`--z-page`). See **Z-Index Scale** below.
  - **Previous Pages:** Tabs appear on the left side (`.bookmark-tab.left`).
  - **Next Pages:** Tabs appear on the right side (`.bookmark-tab.right`).
  - **Implementation:** `base.njk` loops through `navigation.items` (from `_data/navigation.json`) to generate tabs dynamically.

- **Symmetry:** Both left and right pages use `flex: 1` for equal 50/50 width distribution.

- **Page Depth:** Physical DOM implementation (`.page-stack` containing 5 `.stack-leaf` divs) nested within page wrappers to create a realistic, fanned book edge. Shadow artifacts on the inner spine edges are avoided by clipping the content layer shadows.
  - **Accessibility:** The `.page-stack` element carries `aria-hidden="true"` to prevent screen readers from announcing the decorative empty divs.

### 4.2 Responsive States

**Transition Specification:** All layout transitions use `0.6s cubic-bezier(0.25, 1, 0.5, 1)` to mimic the weight of paper and wood.

1. **The Workbench (Desktop > 900px):**
   - **Home:** Centered Cover.
   - **Open State:** Two-page spread layout (Left: TOC or Field Notes | Right: Content).
   - **Navigation:** Bookmark tabs for page-to-page navigation.
   - **Book Width:** `1100px` max-width when open.
2. **The Folded Notebook (Mobile < 900px):**
   - **Layout:** Single column "Folded" view.
   - **Left Page:** Hidden completely (`display: none !important`).
   - **Right Page:** Styled with a left border to simulate a folded-back spine.
   - **Navigation:** Mobile menu via the C-Clamp button.
   - **Background:** Scaled wooden texture to maintain context.

### 4.3 Z-Index Scale (Layering Hierarchy)

To prevent "z-index wars" when adding new layers (modals, tooltips, etc.), we formalize the stacking order in `variables.css`:

| Variable          | Value | Purpose                                |
|-------------------|-------|----------------------------------------|
| `--z-stack`       | -10   | Base for page stack leaves (-11 to -15)|
| `--z-tab`         | 1     | Bookmark tabs (between stack and page) |
| `--z-page`        | 5     | Primary content page                   |
| `--z-container`   | 10    | Field guide container                  |
| `--z-overlay`     | 100   | Future: modals, tooltips               |
| `--z-mobile-menu` | 200   | Future: mobile drawer overlay          |

**Rule:** When adding a new layer, select from this scale rather than inventing a new number.

### 4.4 Mobile Breakpoint Handling

The mobile state transition uses `window.matchMedia` instead of a `resize` event with `setTimeout` debouncing. This is more performant and only fires when the 900px breakpoint is actually crossed—not on every pixel change during window dragging.

```javascript
const mobileQuery = window.matchMedia("(max-width: 900px)");
mobileQuery.addEventListener("change", handleBreakpointChange);
```

---

## 5.0 THE MATERIALITY ENGINE (Organic Realism)

We move from cold metal to warm wood and paper.

### 5.1 Protocol A: The Workbench (Warm Wood)

- **Source:** `src/assets/img/desktop.webp` (Fallback: `.jpg`).
- **Dimensions:** 2560 × 3000.
- **Behavior:** The background extends down to allow for scrolling without breaking the illusion of the desk surface.
- **Feel:** Warm, lived-in, history. Not a pristine digital surface, but a workspace.

### 5.2 Protocol B: The Carving (Text/Icons on Wood)

Elements on the workbench (like the C-Icon) are **carved** or **burned** into the wood, not printed on top.

- **Technique:** Inner shadows and highlights to create depth.
- **Highlight:** Bottom-right light edge (`rgba(255,255,255,0.3)`).
- **Shadow:** Top-left dark recess (`rgba(0,0,0,0.4)`).
- **Blend Mode:** `mix-blend-mode: multiply` to "burn" into the wood.
- **Result:** Realistic engraving effect.
- **Implementation:** `.workbench-icon` positioned at `top: 3rem; right: 3rem` with `position: absolute`.

### 5.3 Protocol C: The Field Guide (Paper & Vellum)

- **Cover:** Textured, thick cardstock feel for the home page.
- **Pages:** Aged Vellum/Bond paper (`#d8cdb0`) with:
  - **Texture:** `background-image: url("../img/paper-grain.svg")` at `512px 512px` with `multiply` blend.
  - **Color Grading:** Transitioned from sterile white to late-60s printed catalog tones (Yellowed Bond).
  - **Depth:** Physical DOM implementation (`.page-stack` containing 5 `.stack-leaf` divs) behind each page to create a realistic, fanned book edge.
    - **Fanning:** Each leaf is subject to randomized micro-rotations (e.g., 0.05deg to 0.25deg) to simulate the subtle imperfections of a physical book.
    - **Texture:** Each leaf shares the same `#paperDistress` filter and paper grain texture as the main page for cohesive materiality.
    - **Shading:** Linear gradients and variable opacity applied to lower layers to create depth and separation between sheets.
    - **Layering:** The primary content page sits at `var(--z-page)`, tabs at `var(--z-tab)`, and stack leaves at `calc(var(--z-stack) - n)` where n = 1–5. See Section 4.3 for the full z-index scale.
  - **Spine Handling:**
    - **Straight Edge:** Inner edges are clipped using `clip-path: polygon(...)` to ensure a clean, bound spine regardless of page-edge distress.
    - **Gutter Shadow:** Deep linear gradient (`rgba(62, 39, 35, 0.4)`) intensifying toward the center binding.
- **Typography:**
  - **Logo:** "Cooper St Logic Shop" behaves as the Book Title on the cover, and a Header on inner pages.
  - **Body:** Serif for readability (Fraunces/Public Sans mix).
  - **Ink Effect:** `mix-blend-mode: multiply` on all text elements (`p, h1, h2, h3, li`) with `color: #1a1a1a`.
  - **Ink Spread:** Uses SVG `#inkBleed` filter to simulate physical wicking into paper fibers.

### 5.4 Protocol D: The Navigation (Tabs & TOC)

- **Table of Contents:** Only visible on the left page when viewing `/shop/`.
  - **Implementation:** Conditional logic in `base.njk`: `{% if page.url == '/shop/' %}{% include "nav.njk" %}{% endif %}`.
  - **Data Source:** `nav.njk` loops over `navigation.items` from `_data/navigation.json` to generate the TOC list.
- **Tabs:** Hand-written style labels protruding from the page edges.
  - **Visuals:** Slightly lighter than page color (`#FDFBF6`) with subtle shadow.
  - **Interaction:** Hover effects that pull the tab out slightly (`transform: translateX(3px)`).
  - **Stability:** CSS-variable-driven `top` positions (via `--tab-index`) ensure tabs don't jump when switching sides and can be adjusted globally from `variables.css`.

### 5.5 Protocol E: The Entry Animation

- **Effect:** `@keyframes settleBook` creates a subtle "placement" animation when the book loads.
- **Motion:** `translateY(10px) rotateX(2deg)` → `translateY(0) rotateX(0)`.
- **Duration:** `1s cubic-bezier(0.25, 1, 0.5, 1)`.

### 5.6 Protocol F: SVG Filter Synthesis (Materiality Library)

We utilize procedural SVG filters to break the "perfect" digital line and simulate physical manufacturing imperfections.

- **`#paperDistress`**: Applied to the page background (`::before`).
  - **Macro Noise:** Low-frequency turbulence for rolling creases and structural warping.
  - **Lighting:** `feDiffuseLighting` with a warm `#fff8e1` tint to create 3D surface undulations.
  - **Rough Edges:** `feDisplacementMap` (scale 1.5) using mid-frequency noise to "wiggle" the page boundaries, creating a torn/deckle edge effect.
- **`#inkBleed`**: Applied to typographic elements.
  - **Warping:** Simulates the slight wicking of liquid ink into cellulose fibers.
  - **Dilation:** Uses `feMorphology` to slightly thicken letterforms, mimicking the weight of old-school printing presses.
  - **Thresholding:** `feColorMatrix` ensures the ink remains dark while having slightly fuzzy, organic edges.
- **Purpose:** Enhances the physical realism by making the book feel like it's being set down on the workbench.

---

## 6.0 FABRICATION (Development Workflow)

### 6.1 Firing Up (Local Server)

We use 11ty's hot-reloading server for development.

```bash
npm start
```

- **Output:** `http://localhost:8080`
- **Process:** 11ty watches `src/` and rebuilds instantly upon save.

### 6.2 Shop Safety Checks (Linting & Testing)

Before committing any code, sweep the floor.

```bash
# Format Code (Prettier)
npm run format

# Inspect HTML Structure (HTMLHint)
npm run lint

# Run Unit Tests (Coming Soon)
# npm test
```

We will implement basic regression tests for critical flows (visual regression or snapshot testing) to ensure the "Physicalism" isn't broken by CSS updates.

---

## 7.0 SHIPPING (Deployment)

We use **Netlify** as our shipping container. The deployment is atomic and immutable.

### 7.1 Configuration (`netlify.toml`)

- **Build Command:** `npm run build` (Runs `eleventy`).
- **Publish Directory:** `_site`.
- **Headers:** Configured for security (`X-Frame-Options: DENY`) and cache control.

### 7.2 Connection Procedure

1. Push `main` branch to GitHub.
2. Connect Repository to Netlify.
3. **Build Settings:**
   - Command: `npm run build`
   - Directory: `_site`
4. Netlify will auto-detect the `.nvmrc` or `engines` field in `package.json`.

---

## 8.0 STANDARD OPERATING PROCEDURES (SOP)

### SOP-01: Updating Content

1. Navigate to `src/`.
2. Open the relevant Markdown file (`index.md`, `shop.md`).
3. Edit the content using standard Markdown.
   - _Note:_ Do not use HTML tags for structure unless absolutely necessary.
4. Commit and Push. Netlify handles the rest.

### SOP-02: Adding or Renaming Pages (Navigation Manifest)

1. Open `src/_data/navigation.json`.
2. Add a new item to the `items` array or modify an existing entry.
   - `url`: The page path (e.g., `/new-page/`).
   - `tabLabel`: Short label for bookmark tabs (e.g., `"NEW"`).
   - `tocLabel`: Full name for Table of Contents (e.g., `"NEW PAGE"`).
   - `id`: Unique integer for ordering (determines which tabs appear left vs. right).
   - `number`: Two-digit section number (e.g., `"05"`).
3. Create the corresponding Markdown file in `src/` with the correct front matter.
4. The TOC and bookmark tabs will auto-generate from this manifest.

### SOP-03: Image Processing

All imagery must pass through the **Dither Protocol**.

1. **Desaturate:** Convert to Grayscale.
2. **Threshold:** Increase contrast (High blacks).
3. **Halftone:** Apply a visible dot pattern (or dithering).
4. **Save:** Optimized PNG/WebP to `src/assets/img/`.

---

## 9.0 CONTENT STRATEGY ("Coming Soon")

Since the shop is being fitted out, secondary pages must communicate status without breaking the "Industrial" narrative.

### 9.1 Inventory (`/inventory`)

- **Status:** Offline.
- **Message:** "STOCKROOM LOCKED. ANNUAL INVENTORY AUDIT IN PROGRESS."
- **Visual:** A single dashed line and a timestamp of the next expected shipment.

### 9.2 Fabrication (`/fabrication`)

- **Status:** Offline.
- **Message:** "MACHINERY UNDER MAINTENANCE. CALIBRATING LOGIC GATES."
- **Visual:** A technical diagram of a placeholder component.

### 9.3 The Shop (`/shop`)

- **Status:** Offline.
- **Message:** "SHIFT CHANGE. SWEEPING UP SAWDUST."

### 9.4 Personnel (`/personnel`)

- **Title:** "PERSONNEL"
- **Role:** Nights and Weekends Manager.
- **Content:** A cheeky bio explaining Dylan Webster is the sole proprietor and this is a side project.
- **Vibe:** "Employee of the Month" (for 12 months in a row) style humor possible, or just a simple stamped ID card look.

---

## 10.0 LICENSE & LEGAL

Proprietary / Closed Source.

The visual identity, including the "Cooper St" wordmark, the "Structural C" icon, and the specific CSS implementation of the "Materiality Engine," is the property of Cooper St Logic Shop.

- **Repository License:** UNLICENSED (All rights reserved).
- **Open Source Components:**
  - _11ty:_ MIT License.
  - _Fraunces Font:_ OFL.
  - _Public Sans Font:_ OFL.
  - _IBM Plex Mono Font:_ OFL.

---

© 2026 Dylan Webster. Santa Cruz, California.
