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
│   ├── _data/             # Global Site Data
│   ├── _includes/         # Layouts & Partials
│   │   ├── base.njk       # The Field Guide Frame (HTML5 Shell)
│   │   ├── nav.njk        # Table of Contents (Left Page)
│   │   └── bookmarks.njk  # Navigation Tabs (Page Markers)
│   ├── assets/
│   │   ├── css/           # The Materiality Engine
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   └── workbench.css
│   │   ├── img/           # SVGs & Textures
│   │   │   ├── icon-c.svg
│   │   │   ├── paper-grain.svg
│   │   │   ├── workbench-right.webp
│   │   │   └── workbench-right.jpg
│   │   └── js/            # Client Logic (Mobile Drawer)
│   │       └── clamp.js
│   ├── index.md           # [COVER]
│   ├── shop.md            # [01 // THE SHOP]
│   ├── inventory.md       # [02 // INVENTORY]
│   ├── fabrication.md     # [03 // FABRICATION]
│   └── personnel.md       # [04 // PERSONNEL]
└── _site/                 # FINISHED GOODS (Gitignored)
```

---

## 4.0 THE LAYOUT ENGINE (The Field Guide)

We treat the content as a physical "Field Guide" book with specific dimensions, resting on a wooden surface.

### 4.1 The Physics of the Book

- **The Cover (Home Page `/`):** The home page behaves as the closed cover of the Field Guide.
  - **Content:** Centered title "COOPER ST LOGIC SHOP" with "FIELD GUIDE VERSION 3.0" and a link to "OPEN FIELD GUIDE".
  - **State:** `data-state` attribute is NOT set to "open" on the body element.
- **The Open Book:** When navigating to any page other than `/`, the guide "flips" open to a two-page spread.
  - **State:** `data-state="open"` is set on the body element via Nunjucks conditional logic.
  - **Layout:** `.field-guide-book` container uses `display: flex` to create a horizontal two-page spread.
- **Left Page Logic:**
  - **On `/shop/` (The Shop):** Displays the Table of Contents (`nav.njk`) and copyright footer.
  - **On Other Pages:** Displays contextual "Field Notes" content defined in the page's front matter as `left_page_content`.
  - **Example:** Inventory page shows "Stockroom Access" rules, Personnel shows an ID card.
- **Right Page:** Always contains the primary page content (Markdown body).

- **Bookmark Tabs:** Navigation is handled via realistic bookmark tabs sticking out from the book edges.
  - **Position Logic:** Each tab has a fixed vertical position (e.g., Shop=100px, Inventory=170px, Fabrication=240px, Personnel=310px).
  - **Stability:** Tabs maintain their vertical position whether they appear on the left or right side, simulating physical tabs attached to specific pages.
  - **Previous Pages:** Tabs appear on the left side (`.bookmark-tab.left`).
  - **Next Pages:** Tabs appear on the right side (`.bookmark-tab.right`).
  - **Implementation:** Managed by `bookmarks.njk` with inline `style="top: {{item.top}}px"`.

- **Symmetry:** Both left and right pages use `flex: 1` for equal 50/50 width distribution.

- **Page Depth:** CSS box-shadows create a visual "stack" effect on both page edges to simulate multiple pages.

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

---

## 5.0 THE MATERIALITY ENGINE (Organic Realism)

We move from cold metal to warm wood and paper.

### 5.1 Protocol A: The Workbench (Warm Wood)

- **Source:** `src/assets/img/workbench-right.webp` (Fallback: `.jpg`).
- **Dimensions:** 2560 × 2865 (WebP) / 1920 × 2149 (JPG).
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
- **Pages:** Off-white vellum (`#F5F3ED`) with:
  - **Texture:** `background-image: url("../img/paper-grain.svg")` at `300px 300px`.
  - **Depth:** Layered box-shadows creating a "page stack" illusion:
    - Left page: `-1px 1px 0 #E0DED7, -2px 2px 0 #D6D3CC, ...` (5 layers).
    - Right page: `1px 1px 0 #E0DED7, 2px 2px 0 #D6D3CC, ...` (5 layers).
  - **Spine Gradient:** Subtle darkening toward the center spine to simulate book binding shadow.
- **Typography:**
  - **Logo:** "Cooper St Logic Shop" behaves as the Book Title on the cover, and a Header on inner pages.
  - **Body:** Serif for readability (Fraunces/Public Sans mix).
  - **Ink Effect:** `mix-blend-mode: multiply` on all text elements (`p, h1, h2, h3, li`) with `color: #1a1a1a`.
  - **Ink Spread:** `.engraved-text` uses `filter: blur(0.2px)` to simulate ink absorption into paper fibers.

### 5.4 Protocol D: The Navigation (Tabs & TOC)

- **Table of Contents:** Only visible on the left page when viewing `/shop/`.
  - **Implementation:** Conditional logic in `base.njk`: `{% if page.url == '/shop/' %}{% include "nav.njk" %}{% endif %}`.
- **Tabs:** Hand-written style labels protruding from the page edges.
  - **Visuals:** Slightly lighter than page color (`#FDFBF6`) with subtle shadow.
  - **Interaction:** Hover effects that pull the tab out slightly (`transform: translateX(3px)`).
  - **Stability:** Fixed `top` positions ensure tabs don't jump when switching sides.

### 5.5 Protocol E: The Entry Animation

- **Effect:** `@keyframes settleBook` creates a subtle "placement" animation when the book loads.
- **Motion:** `translateY(10px) rotateX(2deg)` → `translateY(0) rotateX(0)`.
- **Duration:** `1s cubic-bezier(0.25, 1, 0.5, 1)`.
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

### SOP-02: Image Processing

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
