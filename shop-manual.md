# SHOP MANUAL: COOPER ST LOGIC SHOP

## Pacific Pragmatism / Santa Cruz, CA

```text
      [ C ]
```

STATUS: ACTIVE
VERSION: 2.0.0

---

## 1.0 THE CORE ETHOS

We operate at the intersection of high-level reasoning and hands-on craftsmanship. We do not view software as "magic." We view it as a material to be worked on—like timber or steel.

The Interface Metaphor: The site is a "Warm Manual" (Vellum) resting on a "Cold Metal Workbench" (Industrial Steel).

- **The Workbench:** Rigid, immovable, etched.
- **The Manual:** Organic, readable, stamped.
- **The Relationship:** The Manual is a physical object centered on the bench. It does not stretch to fill the void; it maintains the width of a printed page.

This repository is itself an instantion of a Digital Workshop.

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
│   │   ├── base.njk       # The Workbench Frame (HTML5 Shell)
│   │   ├── header.njk     # The Title Block
│   │   └── nav.njk        # The Sidebar (Engraved Control Panel)
│   ├── assets/
│   │   ├── css/           # The Materiality Engine
│   │   ├── img/           # SVGs (Noise, Icons, Lines)
│   │   └── js/            # Client Logic (Mobile Drawer)
│   ├── index.md           # [01 // INDEX]
│   ├── inventory.md       # [02 // INVENTORY]
│   ├── fabrication.md     # [03 // FABRICATION]
│   └── shop.md            # [04 // THE SHOP]
└── _site/                 # FINISHED GOODS (Gitignored)
```

---

## 4.0 THE LAYOUT ENGINE (Dynamic Centering)

We treat the Vellum as a physical object with a maximum width, centered on the available workbench surface.

### 4.1 The Physics of the Grid

- **Sidebar:** Fixed width (`280px`). The Control Panel.
- **Vellum:** `max-width: 85ch` (approx. 900px). The content should feel like a substantial technical field guide.
- **Margins:** Flexible (`1fr`). The "Metal" fills whatever space remains around the Vellum.
- **Alignment:** The top divider of the Sidebar MUST align perfectly with the top divider of the Header/Vellum.

### 4.2 Responsive States

**Transition Specification:** All layout transitions use `0.5s cubic-bezier(0.25, 1, 0.5, 1)` for consistent feel across all interactions.

1. **The Workbench (Desktop > 900px):**
   - **Sidebar:** Fixed Left. Collapsable via the "C" clamp.
   - **Desktop Sidebar Collapse:** Grid columns and sidebar width transition smoothly when toggled.
   - **Window Resize:** Transitions occur in real-time during resize for smooth layout changes between desktop and mobile states.
   - **Vellum Movement:** Content zone transitions smoothly when sidebar state changes, maintaining visual continuity.
2. **The Field Tool (Mobile < 900px):**
   - **Sidebar:** Hidden by default.
   - **Hamburger Menu:**
     - **Mechanism:** "Drawer" style. Slides down from **UNDER** the Header.
     - **Transition:** Uses the same `0.5s cubic-bezier(0.25, 1, 0.5, 1)` timing as desktop collapse for consistent feel.
     - **Spacing:** No gap between header and first item; immediate utility.
   - **Vellum:** Full width minus `16px` safety margins.
   - **Header:** Always persistent.

---

## 5.0 THE MATERIALITY ENGINE (Advanced Realism)

We do not use flat colors. We use **Texture Protocols** to simulate physical interaction without looking "cheesy."

### 5.1 Protocol A: The Workbench (Cold Rolled Steel)

The bench is not just grey; it is imperfect metal.

- **Base:** `#E3E5E6` (Shop Primer).
- **Texture:** A subtle, high-frequency monochromatic noise filter (SVG) applied at 3% opacity. This breaks the "digital smoothness."
- **Lighting:** Flat. Metal absorbs light.

### 5.2 Protocol B: The Etching (Text on Metal)

Text on the workbench is **milled**, not printed. It has depth.

- **Technique:** CSS `text-shadow`.
- **Highlight:** `1px 1px 0 rgba(255, 255, 255, 0.9)` (Bottom Right - Sharp Light).
- **Shadow:** `-0.5px -0.5px 0 rgba(0, 0, 0, 0.2)` (Top Left - Deep Cut).
- **Color:** `#2C2C2C` (Carbon) or `#6A7375` (Zinc).
- **Result:** Crisp, machined legibility.

### 5.3 Protocol C: The Groove (Dividers on Metal)

Lines on the workbench are **machine-tooled channels**.

- **Technique:** Double borders.
- **Top Border:** `1px solid #B0B3B5` (Shadow/Depth).
- **Bottom Border:** `1px solid #FFFFFF` (Highlight/Edge).
- **Result:** Looks like a physical groove cut into the steel.

### 5.4 Protocol D: The Vellum (Paper Physics)

The page is organic material.

- **Base:** `#F2F0E9`.
- **Grain:** An SVG Fractal Noise filter (`feTurbulence`) layered via `::before`.
- **Ink Absorption:** All text on Vellum uses `mix-blend-mode: multiply`. The black ink must appear to soak _into_ the grain, not float above it.
- **Thickness:** The Vellum sheet has a `1px solid #D4D2CB` border (the cut edge) and a tight `box-shadow: 0 1px 2px rgba(0,0,0,0.05)` to imply the gauge of the paper.

### 5.5 Protocol E: The Draughtsman's Line (Dividers on Vellum)

Lines inside the manual are drawn by hand.

- **Technique:** An SVG background image containing a path with slightly randomized control points.
- **Visual:** Irregular dash array. Variation in stroke width (0.8px to 1.2px).
- **Feeling:** "The imperfect stroke of a 1974 Rotring pen."

### 5.6 Protocol F: The Etched Copyright (Global Footer)

The footer frames the bottom of the workbench.

- **Location:** Below the main content zone, spanning the full width (or content width).
- **Style:** Etched into the steel (Protocol B).
- **Content:** Copyright and location. No links. Just a stamped mark of origin.

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

[ REF: 02.0 ]

© 2026 Dylan Webster. Santa Cruz, California.
