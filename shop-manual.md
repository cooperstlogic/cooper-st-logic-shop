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
│   │   └── filters.svg    # SVG Filter Definitions (inkBleed for headings only)
│   ├── assets/
│   │   ├── css/           # The Materiality Engine
│   │   │   ├── reset.css
│   │   │   ├── variables.css  # Design tokens: colors, z-index scale, tab spacing, page dimensions
│   │   │   └── workbench.css
│   │   ├── img/           # Textures & Icons
│   │   │   ├── icon-c.svg
│   │   │   ├── cover.webp       # Baked cover texture (home page)
│   │   │   ├── paper-left.webp  # Baked page texture for left pages (mirrored)
│   │   │   ├── paper-right.webp # Baked page texture for right pages
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

**PHYSICALISM PRINCIPLE:** The Field Guide maintains consistent dimensions throughout—matching the physical constraints of a real printed guide.

#### Page Dimensions & Book Width

- **Single Page:** 600px width × 800px height (3:4 aspect ratio)
- **Open Book (Two-Page Spread):** 1200px width (600px × 2)
- **Design Rationale:** All pages (cover and interior) share identical width for consistent physicalism. The open book is exactly double the width of a single page.

#### The Cover (Home Page `/`)

The home page behaves as the closed cover of the Field Guide (modeled after the Whole Earth Catalog).

- **Content:** Centered title "COOPER ST LOGIC SHOP" with a link to "access the shop" and an "Est 2026" footer positioned absolutely at the bottom-left corner.
- **State:** `data-state` attribute is NOT set to "open" on the body element.
- **Texture:** Uses `cover.webp` as the background—a baked cardstock texture with a dark/black base color, distinct from the interior page paper.
- **Responsive Scaling:** The cover scales fluidly between 600px width (at 900px viewport) and 350px width (at 375px minimum viewport) while maintaining a fixed 3:4 aspect ratio. Stack leaves beneath the cover scale proportionally. See Section 4.5 for complete implementation details.
- **Typography:** All text elements are styled in warm vanilla off-white (`var(--c-cover-text)`, currently `#fdebc5`) controlled by a single CSS variable to provide contrast against the dark cover background. This includes headings, body text, links, and the cover footer.
- **Header:** The standard `.guide-header` element is completely hidden (`display: none`) on the cover page—no title bar, no C-icon menu. The cover displays only the content area.
- **Ink Effects:** Headings (`h1`, `h2`) and the cover footer retain the `#inkBleed` SVG filter for texture, but use `mix-blend-mode: screen` instead of `multiply` (screen mode brightens and works better for light text on dark backgrounds).
- **Decorative Elements:** The divider line (`.draughtsman-line`) within the article content is hidden (`display: none`) on the cover.

#### The Open Book (Two-Page Spreads)

When navigating to any page other than `/`, the guide "flips" open to a two-page spread.

- **State:** `data-state="open"` is set on the body element via Nunjucks conditional logic.
- **Layout:** `.field-guide-book` container uses `display: flex` and expands to 1200px (600px × 2 pages).

#### Dynamic Page Positioning System

**PHYSICALISM PRINCIPLE:** Pages are automatically positioned like a real book based on their navigation order. Odd-numbered pages are RIGHT pages (recto), even-numbered pages are LEFT pages (verso).

- **Page Side Assignment (from `navigation.json` ID):**
  - **Odd IDs (1, 3, 5...):** RIGHT pages (recto)
  - **Even IDs (2, 4, 6...):** LEFT pages (verso)

- **Automatic Spread Pairing:**
  - Pages 1-2: TOC (left) + Shop (right)
  - Pages 2-3: Inventory (left) + Fabrication (right)
  - Pages 4-5: Personnel (left) + (next page, if added)

- **Content Logic (Dynamic):**
  - When viewing a RIGHT page → paired LEFT page content appears in left wrapper
  - When viewing a LEFT page → paired RIGHT page content appears in right wrapper
  - Special case: `/shop/` (id=1) always shows TOC on the left side

- **Implementation:** Template logic in `base.njk` calculates page side using modulo math (`id % 2 == 0` for left pages) and dynamically fetches paired page content from Eleventy collections.

#### Page-Specific Content

- **Left Page Logic:**
  - **On `/shop/` (The Shop):** Displays the Table of Contents (`nav.njk`) and copyright footer.
  - **On LEFT Pages (even IDs):** Displays the page's primary content.
  - **On RIGHT Pages (odd IDs):** Displays the paired left page's content from the spread.
  - **Custom Content:** Pages can define `left_page_content` in front matter for contextual "Field Notes" (e.g., Inventory shows "Stockroom Access" rules, Personnel shows an ID card).

- **Right Page Logic:**
  - **On RIGHT Pages (odd IDs):** Displays the page's primary content (Markdown body).
  - **On LEFT Pages (even IDs):** Displays the paired right page's content from the spread.
  - **Spine Shadow:** Baked into `paper-right.webp`—appears on the inner edge to simulate depth in the gutter binding.

- **Bookmark Tabs:** Navigation is handled via realistic bookmark tabs sticking out from the book edges. See **Section 5.4 Protocol D** for complete tab navigation documentation.

- **Symmetry:** Both left and right pages use `flex: 1` for equal 50/50 width distribution.

- **Page Depth:** Physical DOM implementation (`.page-stack` containing 5 `.stack-leaf` divs) nested within page wrappers to create a realistic, fanned book edge. Shadow artifacts on the inner spine edges are avoided by clipping the content layer shadows.
  - **Accessibility:** The `.page-stack` element carries `aria-hidden="true"` to prevent screen readers from announcing the decorative empty divs.

### 4.2 Responsive States & Breakpoints

**PHYSICALISM PRINCIPLE:** When the viewport can't fit a two-page spread, we don't squish the pages together (that breaks the physical metaphor). Instead, we transition to a single-page view—like holding the guide with one page visible, ready to turn.

**Transition Specification:** All layout transitions use `0.6s cubic-bezier(0.25, 1, 0.5, 1)` to mimic the weight of paper and wood.

#### Breakpoint 1: Full Spread View (Desktop > 1250px)

- **Home:** Centered Cover at full size (600px × 800px).
- **Open State:** Two-page spread layout showing both pages of the current spread.
  - Left page displays: TOC (for Shop) or paired content
  - Right page displays: Primary content or paired content
- **Navigation:** All bookmark tabs visible on appropriate sides based on spread position.
- **Book Width:** 1200px (600px × 2 pages).

#### Breakpoint 2: Single Page View (900px - 1250px)

**PHYSICALISM PRINCIPLE:** At this breakpoint, the viewport can't fit a two-page spread, so we show only the primary page (the one you navigated to) at its full physical scale.

- **Home (Cover):** Centered at full size (600px × 800px).
- **Open State:** Single page view.
  - Only the primary page wrapper (marked with `.is-primary` class) is displayed
  - Paper maintains its physical scale (600px width, 800px height)
  - Left pages show left paper texture (spine shadow on right)
  - Right pages show right paper texture (spine shadow on left)
- **Navigation:** Tabs hidden at this breakpoint (would stick out awkwardly from single page).
- **Container Width:** 600px (single page).

#### Breakpoint 3: Scaled Mobile View (< 900px)

**PHYSICALISM PRINCIPLE:** Below this breakpoint, both cover and inner pages scale fluidly—like moving the guide further from your eye. The aspect ratio is preserved to maintain the illusion of a real physical object.

- **Home (Cover):** Fluidly scales from 600px width down to 350px width (at 375px viewport minimum), maintaining 3:4 aspect ratio throughout. No horizontal scrolling required—the cover "recedes" naturally. See Section 4.5 for detailed scaling formulas.
- **Layout (Open Pages):** Single page view with fluid scaling.
  - Only the primary page wrapper is displayed (`.is-primary` class)
  - Page scales using same formulas as cover (600px → 350px width)
  - Height scales proportionally to maintain 3:4 aspect ratio
  - Stack leaves scale with the page dimensions
- **Navigation:** Mobile menu via the C-Clamp button (tabs hidden).
- **Background:** Scaled wooden texture to maintain context.

#### Summary of Page Widths Across Breakpoints

| Viewport | Cover Width | Open Book Width | Behavior |
|----------|-------------|-----------------|----------|
| > 1250px | 600px | 1200px (2 pages) | Full two-page spread |
| 900-1250px | 600px | 600px (1 page) | Single page at full scale |
| < 900px | 600px → 350px | 600px → 350px | Fluid scaling with 3:4 ratio |

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

### 4.4 CSS Variables (Design Tokens)

To maintain consistency and enable global adjustments, all critical dimensions are defined as CSS custom properties in `variables.css`:

#### Page Dimensions

| Variable | Value | Purpose |
|----------|-------|---------|
| `--page-width` | 600px | Width of a single page (cover and interior) |
| `--page-height` | 800px | Height of a single page (fixed) |
| `--book-width` | 1200px | Width of open book (two pages side by side) |

**Design Rationale:** These variables enforce consistent physicalism—the cover and all interior pages share identical dimensions, and the open book is exactly double the single page width.

#### Tab Positioning

| Variable | Value | Purpose |
|----------|-------|---------|
| `--tab-start` | 100px | First tab offset from top of book |
| `--tab-height` | 70px | Vertical spacing between tabs |
| `--tab-width` | 45px | Tab width (horizontal depth from book edge) |
| `--tab-depth` | 50px | Tab height (vertical text area) |

**Usage:** Tab positions are calculated as `top: calc(var(--tab-start) + (var(--tab-height) * var(--tab-index)))` where `--tab-index` is set inline from the navigation ID.

#### Color Palette

| Variable | Value | Purpose |
|----------|-------|---------|
| `--c-cover-text` | #fdebc5 | Warm vanilla off-white for cover typography |
| `--c-wood-base` | #5D4037 | Base workbench wood color |
| `--c-wood-highlight` | #8D6E63 | Wood highlight tones |
| `--c-wood-shadow` | #3E2723 | Wood shadow/carved text color |

**Rule:** When adjusting dimensions or colors, modify these variables rather than hardcoding values throughout the CSS.

### 4.5 Mobile Breakpoint Handling

The mobile state transition uses `window.matchMedia` instead of a `resize` event with `setTimeout` debouncing. This is more performant and only fires when the 900px breakpoint is actually crossed—not on every pixel change during window dragging.

```javascript
const mobileQuery = window.matchMedia("(max-width: 900px)");
mobileQuery.addEventListener("change", handleBreakpointChange);
```

### 4.6 Responsive Page Scaling (Fluid Physicalism)

**PHYSICALISM PRINCIPLE:** Both cover and inner pages scale proportionally as the viewport shrinks, maintaining their physical aspect ratio (3:4). This preserves the illusion of a real object receding into the distance rather than being cropped or distorted.

#### Design Philosophy

- **Minimum Assumed Viewport:** 375px (smallest common mobile browser width)
- **Scaling Strategy:** Fluid responsive sizing (linear interpolation) between 900px and 375px breakpoints
- **Aspect Ratio:** Fixed 3:4 ratio (600px width : 800px height) maintained across all viewport sizes
- **Consistency:** Cover and inner pages use IDENTICAL scaling formulas for uniform physicalism
- **Background Visibility:** At minimum viewport (375px), pages reach ~350px width, leaving ~12.5px margin on each side to reveal the workbench surface

#### Implementation: Fluid Scaling Formulas (Universal)

Both cover and inner pages use CSS `clamp()` with calculated viewport-based formulas to scale smoothly between breakpoints:

**Width Scaling (Cover & Inner Pages):**
```css
width: clamp(350px, calc(171.43px + 47.62vw), 600px);
```
- At 900px viewport → 600px width (full size)
- At 375px viewport → 350px width (minimum)
- Linear interpolation: Slope = (600-350)/(900-375) = 250/525 ≈ 0.476

**Height Scaling (Proportional - Cover & Inner Pages):**
```css
height: clamp(467px, calc(228.57px + 63.49vw), 800px);
```
- At 900px viewport → 800px height (full size)
- At 375px viewport → ~467px height (maintains 3:4 ratio)
- Formula: width × (800/600) = width × 1.333

**Math Reference:**
- Width formula derivation: `width = 171.43px + 47.62vw`
  - At 900px: 171.43 + (900 × 0.4762) = 600px ✓
  - At 375px: 171.43 + (375 × 0.4762) = 350px ✓
- Height formula derivation: `height = 228.57px + 63.49vw`
  - At 900px: 228.57 + (900 × 0.6349) = 800px ✓
  - At 375px: 228.57 + (375 × 0.6349) = 467px ✓

#### Implementation: Supporting Elements

**Stack Leaves (Underlying Pages):**
The page stack must scale identically to maintain physical realism. Both cover and inner page stacks use the same formula:

```css
/* Cover state */
body:not([data-state="open"]) .page-stack,
body:not([data-state="open"]) .stack-leaf,
body:not([data-state="open"]) .stack-leaf::before {
  height: clamp(467px, calc(228.57px + 63.49vw), 800px);
}

/* Open state (inner pages) */
body[data-state="open"] .page-stack,
body[data-state="open"] .stack-leaf,
body[data-state="open"] .stack-leaf::before {
  height: clamp(467px, calc(228.57px + 63.49vw), 800px);
}
```

**Page Textures:**
The background images fill the scaled dimensions:

```css
/* Cover texture */
body:not([data-state="open"]) .guide-page.right::before {
  height: 100%; /* Fills the dynamically scaled cover height */
}

/* Inner page textures */
body[data-state="open"] .guide-page::before {
  height: 100%; /* Fills the dynamically scaled page height */
}
```

**Cover Footer ("Est 2026"):**
Positioned absolutely from the bottom-left corner to maintain consistent spatial relationship regardless of cover scale:

```css
.cover-footer {
  position: absolute;
  bottom: 4rem;
  left: 4rem;
  /* Desktop positioning */
}

/* Mobile scaling */
@media (max-width: 900px) {
  body:not([data-state="open"]) .cover-footer {
    bottom: 4rem;
    left: 4rem;
    font-size: 0.9rem;
  }
}
```

**Positioning Context:**
The cover page explicitly establishes positioning context:

```css
body:not([data-state="open"]) .guide-page.right {
  position: relative; /* Explicit positioning context for cover-footer */
  overflow: visible;
  max-height: none;
}
```

#### Implementation: Cover Text Color System

**DESIGN PRINCIPLE:** All cover text shares a unified warm vanilla off-white color to contrast against the dark cover background. A single CSS variable controls the color palette for consistent theming.

**Variable Definition:**
```css
:root {
  --c-cover-text: #fdebc5; /* Warm vanilla off-white for dark cover background */
}
```

**Application Scope:**
- **Headings (h1, h2):** `color: var(--c-cover-text)` with `mix-blend-mode: screen` and `filter: url(#inkBleed)`
- **Body text (p, h3-h6, strong, a):** `color: var(--c-cover-text)` with `opacity: 0.95`
- **Link borders:** `border-color: var(--c-cover-text)`
- **Cover footer:** `color: var(--c-cover-text)`

**Rationale:**
- Single source of truth: Change `--c-cover-text` to adjust all cover typography at once
- Warm vanilla tone (#fdebc5) provides optimal contrast and readability against dark cover texture
- Screen blend mode (not multiply) used for light text on dark backgrounds

#### Browser Compatibility

- **CSS `clamp()`:** Supported in all modern browsers (Chrome 79+, Firefox 75+, Safari 13.1+)
- **CSS Custom Properties:** Widely supported
- **Fallback:** Not required for target browsers (2024+ baseline)

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
- **Implementation:** `.mobile-clamp` (mobile menu button) appears in the `.guide-header` element, which is only visible on interior pages (the header is hidden entirely on the cover page via `display: none`).

### 5.3 Protocol C: The Field Guide (Paper & Vellum)

**Performance Principle:** We "bake" expensive texture compositing into static WebP images rather than solving rendering equations at runtime. The browser should display a simple image—not calculate multi-layer blend modes on every scroll frame.

- **Cover (Home Page `/`):** Uses `cover.webp` as the background texture.
  - **Feel:** Textured, thick cardstock with a dark/black base mimicking the cover boards of the Whole Earth Catalog.
  - **Application:** Applied via `background-image` on the page element when `data-state` is NOT "open".
  - **Text Styling (Cover-Specific):** Because the cover background is dark, all text elements are inverted to warm vanilla off-white tones using the `--c-cover-text` CSS variable (currently `#fdebc5`):
    - **Headings (`h1`, `h2`):** Color `var(--c-cover-text)` with `mix-blend-mode: screen` and `filter: url(#inkBleed)` for realistic ink texture.
    - **Body Text (`p`, `strong`, `a`):** Color `var(--c-cover-text)` with `opacity: 0.95` for subtle ink density.
    - **Link Borders:** Button borders use `var(--c-cover-text)` for visual consistency.
    - **Cover Footer ("Est 2026"):** Color `var(--c-cover-text)` with `mix-blend-mode: screen` and `filter: url(#inkBleed)`.
    - **Rationale:** The `screen` blend mode is used instead of `multiply` because it brightens rather than darkens—appropriate for light text on dark backgrounds. This preserves the organic ink aesthetic while ensuring readability on the black cover. All cover text references a single CSS variable for unified theming (see Section 4.5 for implementation details).

- **Pages (Interior Spreads):** Use separate pre-rendered background textures for left and right pages.
  - **Source Images:**
    - `src/assets/img/paper-right.webp` — Baked texture for right pages containing:
      - Aged Vellum/Bond paper base color (late-60s printed catalog tones)
      - Paper grain and fiber structure
      - **Spine shading:** Subtle shadow gradient simulating paper curving into the binding gutter (shadow falls toward the left/spine edge)
    - `src/assets/img/paper-left.webp` — Baked texture for left pages with the same characteristics but oriented for the left side.
  - **Left Page Implementation:** `paper-left.webp` is applied with `transform: scaleX(-1)` to mirror the texture, ensuring the spine shading correctly falls toward the center binding.
  - **Right Page Implementation:** `paper-right.webp` is applied directly without transformation, with spine shading falling naturally toward the binding.
  - **Application:** Applied via `background-image` on `.guide-page::before` pseudo-elements, replacing the previous runtime-composited approach (paper-grain.svg + gradients + filters).

- **Page Stack Depth:** Physical DOM implementation (`.page-stack` containing 5 `.stack-leaf` divs) behind each page to create a realistic, fanned book edge.
  - **Fanning:** Each leaf is subject to randomized micro-rotations (e.g., 0.05deg to 0.25deg) to simulate the subtle imperfections of a physical book.
  - **Texture:** Stack leaves use the same page textures (`paper-left.webp` for left side, `paper-right.webp` for right side, with left side mirrored) for cohesive materiality.
  - **Shading:** Variable opacity applied to lower layers to create depth and separation between sheets.
  - **Layering:** The primary content page sits at `var(--z-page)`, tabs at `var(--z-tab)`, and stack leaves at `calc(var(--z-stack) - n)` where n = 1–5. See Section 4.3 for the full z-index scale.

- **Physical Depth (Shadows):** The book casts realistic shadows onto the workbench surface to convey physical presence.
  - **Book Shadow:** `.field-guide-book` uses a three-layer `box-shadow`:
    1. Contact shadow (0 2px 4px) - tight shadow directly under the book
    2. Ambient shadow (0 8px 24px) - soft, diffused depth shadow
    3. Distance shadow (0 16px 48px) - subtle far-reaching shadow for weight
  - **Page Shadow:** Individual pages have subtle shadows to separate them from the stack beneath.

- **Spine Handling:**
  - **Straight Edge:** Inner edges are clipped using `clip-path: polygon(...)` to ensure a clean, bound spine.
  - **Gutter Shadow:** Baked into `paper-left.webp` and `paper-right.webp` rather than applied via CSS gradients, providing authentic depth without runtime performance cost.

- **Typography:**
  - **Logo:** "Cooper St Logic Shop" behaves as the Book Title on the cover, and a Header on inner pages.
  - **Body:** Serif for readability (Fraunces/Public Sans mix).
  - **Ink Simulation (Performance-Optimized):**
    - **Interior Pages (Default):**
      - **Headings (`h1`, `h2`):** Apply `filter: url(#inkBleed)` and `mix-blend-mode: multiply`. These are high-impact elements where the expensive filter is justified. Dark ink (`#1a1a1a`) on light paper.
      - **Body Text (`p`, `h3`, `li`):** Use `color: #1a1a1a` with `opacity: 0.9` to simulate ink density. **No blend mode or filter.** The carefully selected color and weight create the impression of ink without per-pixel blend calculations on every scroll frame.
    - **Cover Page (Dark Background Override):**
      - **Headings (`h1`, `h2`):** Apply `filter: url(#inkBleed)` and `mix-blend-mode: screen` with off-white color (`#e0ddd5`). The `screen` blend mode brightens rather than darkens—essential for light text on dark backgrounds.
      - **Body Text:** Use off-white color (`#d5d2ca`) with `opacity: 0.95` for subtle contrast.
      - **Implementation:** Cover-specific styles are scoped with `body:not([data-state="open"])` selector to isolate the styling from interior pages.

### 5.4 Protocol D: The Navigation (Tabs & TOC)

#### Table of Contents

- **Visibility:** Only visible on the left page when viewing `/shop/`.
- **Implementation:** Conditional logic in `base.njk`: `{% if page.url == '/shop/' %}{% include "nav.njk" %}{% endif %}`.
- **Data Source:** `nav.njk` loops over `navigation.items` from `_data/navigation.json` to generate the TOC list.

#### Physical Bookmark Tabs (Realistic Page Markers)

**PHYSICALISM PRINCIPLE:** Tabs are physically attached to pages in the guide. Each tab has a fixed vertical position based on its page number, and the tab's side (left or right edge) depends on whether that page has been turned past the current spread.

##### Tab Positioning System

**Fixed Vertical Positions:**
- Each tab has a FIXED vertical position calculated from its navigation ID
- Position formula: `top: calc(var(--tab-start) + (var(--tab-height) * var(--tab-index)))`
- `--tab-index` = navigation ID - 1 (for 0-based positioning)
- Example: Page 2 (INV) → `--tab-index: 1` → top: 100px + (70px × 1) = 170px

**Dynamic Side Assignment (Spread-Based):**

Tabs switch sides based on the current spread position, simulating a physical book where turned pages stack on the left and unread pages stack on the right.

- **Pages Already Turned (ID <= spreadLeftId):**
  - Tabs appear on the **LEFT** edge of the book
  - These pages are in the "read" stack
  
- **Current Right Page & Beyond (ID >= spreadRightId):**
  - Tabs appear on the **RIGHT** edge of the book
  - These pages are in the "unread" stack

**Example: Pages 2-3 Spread (Inventory/Fabrication):**
- SHOP tab (id=1) → LEFT side (already turned)
- INV tab (id=2) → LEFT side (left page of current spread)
- FAB tab (id=3) → RIGHT side (right page of current spread)
- PERS tab (id=4) → RIGHT side (ahead, not yet reached)

##### Tab Interactivity

**Active Tabs (Clickable):**
- Rendered as `<a>` elements with `href` to navigate
- Hover effect: slightly extends outward (`transform: translateX(±3px)`)
- Lighter background on hover (`#e0d5bb`)

**Inactive Tabs (Current Spread):**
- Tabs for pages currently visible in the spread are non-clickable
- Rendered as `<span>` elements instead of `<a>` links
- Styled with `pointer-events: none` and `cursor: default`
- No hover effects (you're already viewing this page)

**Example on Pages 2-3:** INV and FAB tabs are inactive (both pages visible), while SHOP and PERS tabs remain clickable.

##### Visual Design

- **Color:** All tabs use paper color (`#d8cdb0`) to match the physical pages
- **Border:** Subtle border (`rgba(139, 119, 101, 0.3)`) for definition
- **Shadow:** `1px 1px 3px rgba(0,0,0,0.15)` for depth
- **Typography:** Vertical text (`writing-mode: vertical-rl`) in handwriting font
- **Size:** `45px` wide × `50px` tall (controlled by `--tab-width` and `--tab-depth`)

##### Implementation Details

**Template Logic (base.njk):**
```nunjucks
{% for item in navigation.items %}
  {% set isInCurrentSpread = (item.id == spreadLeftId or item.id == spreadRightId) %}
  
  {% if item.id <= spreadLeftId %}
    {# Tab goes on LEFT side #}
    {% if isInCurrentSpread %}
      <span class="bookmark-tab left is-current" style="--tab-index: {{ item.id - 1 }}">
        {{ item.tabLabel }}
      </span>
    {% else %}
      <a href="{{ item.url }}" class="bookmark-tab left" style="--tab-index: {{ item.id - 1 }}">
        {{ item.tabLabel }}
      </a>
    {% endif %}
  {% else %}
    {# Tab goes on RIGHT side #}
    {# ... similar logic ... #}
  {% endif %}
{% endfor %}
```

**CSS Variables (variables.css):**
```css
--tab-start: 100px;   /* First tab offset from top */
--tab-height: 70px;   /* Vertical spacing between tabs */
--tab-width: 45px;    /* Tab width */
--tab-depth: 50px;    /* Tab height (vertical text area) */
```

**Responsive Behavior:**
- **Desktop (> 1250px):** All tabs visible
- **Tablet (900-1250px):** Tabs hidden (single-page view makes tabs awkward)
- **Mobile (< 900px):** Tabs hidden (mobile menu navigation instead)

### 5.5 Protocol E: The Entry Animation

- **Effect:** `@keyframes settleBook` creates a subtle "placement" animation when the book loads.
- **Motion:** `translateY(10px) rotateX(2deg)` → `translateY(0) rotateX(0)`.
- **Duration:** `1s cubic-bezier(0.25, 1, 0.5, 1)`.

### 5.6 Protocol F: SVG Filter Synthesis (Materiality Library)

**Performance Principle:** Complex SVG filters like `feTurbulence` and `feDisplacementMap` trigger repaint and composite operations on every scroll frame. On a high-end MacBook, this looks like ink; on a mid-range phone, it looks like lag. We limit filter use to high-impact, low-frequency elements.

#### Deprecated: `#paperDistress`

The previous `#paperDistress` filter (macro noise, diffuse lighting, displacement mapping) has been **removed**. Paper texture, grain, and spine shading are now "baked" into static WebP images (`paper-left.webp`, `paper-right.webp`, `cover.webp`). This eliminates per-frame rendering calculations for the page background.

#### Active: `#inkBleed` (Headings Only)

- **Scope:** Applied **only** to `h1` and `h2` elements. Body text (`p`, `h3`, `li`) does NOT receive this filter.
- **Warping:** Simulates the slight wicking of liquid ink into cellulose fibers.
- **Dilation:** Uses `feMorphology` to slightly thicken letterforms, mimicking the weight of old-school printing presses.
- **Thresholding:** `feColorMatrix` ensures the ink remains dark while having slightly fuzzy, organic edges.
- **Rationale:** Headings are sparse, high-visual-impact elements. The per-pixel cost of the filter is acceptable because there are few of them on any given page. Body text, which dominates the DOM, uses color/opacity simulation instead (see Section 5.3).

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

# Validate Content Fits Page Bounds
npm run validate

# Run Unit Tests (Coming Soon)
# npm test
```

We will implement basic regression tests for critical flows (visual regression or snapshot testing) to ensure the "Physicalism" isn't broken by CSS updates.

### 6.3 Content Validation (Physical Page Constraints)

**PHYSICALISM PRINCIPLE:** The Field Guide has fixed physical dimensions. Paper doesn't grow to accommodate overflow—content must fit within the page bounds.

#### Page Dimensions

- **Fixed Height:** 800px
- **Padding:** 4rem (top) + 4rem (bottom) = 128px
- **Header:** ~100px
- **Usable Content Area:** ~572px

#### Validation Script

Run `npm run validate` to check if content exceeds the fixed page size:

```bash
npm run validate
```

**Output:**
- ✅ **OK:** Content fits within page bounds
- ⚠️ **WARNING:** Page is 90% full (approaching limit)
- ❌ **ERROR:** Content overflows fixed page size

**Build Integration:** The validation script runs automatically before each build via the `prebuild` hook in `package.json`. If content overflows, the build will fail with exit code 1, preventing deployment of broken layouts.

#### Implementation Details

The validation script (`validate-content.js`) estimates rendered height by analyzing Markdown content:

- **Headings:** `h1` = 48px, `h2` = 36px, `h3` = 28px
- **Paragraphs:** ~24px line height + 16px spacing
- **Rules:** `<hr>` = 32px

**Note:** These are rough estimates. For precise validation, test in the browser using `npm start`.

#### Content Overflow Handling (CSS)

When content exceeds the fixed page size:

- `.guide-page`: `max-height: 800px` with `overflow: hidden`
- `.guide-page::before`: Paper texture fixed at `height: 800px`
- `.page-stack`: Stack leaves fixed at `height: 800px`

**Result:** Content that exceeds 800px is clipped (hidden), not displayed. The paper texture doesn't stretch or create discontinuities.

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
4. **Validate content fits within page bounds:** Run `npm run validate` to ensure content doesn't exceed the fixed 800px page height (~572px usable area after padding/header).
   - If validation fails, reduce content length or split across multiple pages.
   - Remember: Paper has fixed dimensions—content must fit the physical page.
5. Commit and Push. Netlify handles the rest.

### SOP-02: Adding or Renaming Pages (Navigation Manifest)

1. Open `src/_data/navigation.json`.
2. Add a new item to the `items` array or modify an existing entry.
   - `url`: The page path (e.g., `/new-page/`).
   - `tabLabel`: Short label for bookmark tabs (e.g., `"NEW"`).
   - `tocLabel`: Full name for Table of Contents (e.g., `"NEW PAGE"`).
   - `id`: Unique sequential integer for ordering.
     - **IMPORTANT:** The ID determines page side assignment:
       - **Odd IDs (1, 3, 5...)**: RIGHT pages (recto)
       - **Even IDs (2, 4, 6...)**: LEFT pages (verso)
     - Pages automatically pair in spreads based on sequential IDs
     - Example: ID 4 (Personnel, left) pairs with ID 5 (next page, right)
   - `number`: Two-digit section number (e.g., `"05"`).
3. Create the corresponding Markdown file in `src/` with the correct front matter.
   - Add `layout: base.njk` to front matter
   - Add `title: Page Title` for the page heading
   - Optionally add `left_page_content: |` for custom left-side field notes
4. The TOC, bookmark tabs, and spread pairings will auto-generate from this manifest.
5. Pages will automatically position as left or right based on their ID (odd=right, even=left).

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
