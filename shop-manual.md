<!-- markdownlint-disable-next-line MD033 -->
# COOPER ST <br> LOGIC SHOP: <br> SHOP MANUAL

**VERSION:** 1.0.0

---

## 1.0 THE CORE ETHOS

This repository is a Digital Workshop. It contains the raw materials (HTML/CSS) and the tools (Scripts) required to manufacture the company landing page.

---

## 2.0 WORKBENCH PREPARATION

Before commencing work, ensure your local environment meets the shop standards.

### 2.1 First-Time Setup (Fitting Out)

If you are initializing the shop for the first time, execute the following sequence:

1. **Clone the Repository**
   Bring the materials onto your local workbench.

   ```bash
   git clone https://github.com/your-username/cooper-st-logic-shop.git
   cd cooper-st-logic-shop
   ```

2. **Install Shop Tools**
   We use minimal dependencies (`serve`, `prettier`, `htmlhint`) to keep the shop floor clean.

   ```bash
   npm install
   ```

   _Note: This command reads the inventory in `package.json` and provisions the necessary equipment._

---

## 3.0 FABRICATION (Development)

We work with Structural Honesty. We edit the raw files directly. There is no compilation step, no bundler, and no "transpiling." What you write is what the browser renders.

### 3.1 Firing Up (Local Server)

To inspect the work-in-progress, start the local static server.

```bash
npm start
```

- **Output:** `http://localhost:3000`
- **Behavior:** Serves the current directory as a static site. Changes to HTML/CSS require a browser refresh.

### 3.2 The Materiality Engine (CSS Architecture)

All styling is handled in `assets/css/styles.css`. We use CSS Custom Properties (Variables) to define the physics of the brand.

**The Palette:**

- `--c-vellum` (#F2F0E9): The Page Background (Warm Manual).
- `--c-primer` (#E3E5E6): The Workbench Background (Cool Bench).
- `--c-carbon` (#1C1C1C): The Ink.
- `--c-zinc` (#5F6B6D): The Grid/Metadata.
- `--c-redwood` (#8B3A3A): Action items.

**The Physics:**

- **Transitions:** `none`. Feedback must be instant.
- **Depth:** Flat. No drop shadows. Use borders to define edges.

### 3.3 Shop Safety Checks (Linting)

Before committing any code, sweep the floor.

```bash
# Format code (Prettier)
npm run format

# Inspect HTML structure (HTMLHint)
npm run lint
```

---

## 4.0 ASSEMBLY (File Structure)

The repository is organized like a physical workshop. Everything has a place.

```text
cooper-st-logic-shop/
├── .well-known/           # Standard Protocols (Security)
│   └── security.txt       # Reporting contact
├── assets/                # Raw Materials
│   ├── css/               # The Paint Shop
│   └── img/               # The Parts Bin
├── index.html             # The Main Assembly
├── netlify.toml           # Shipping Label
├── package.json           # Tool Inventory
├── robots.txt             # Access Control
└── sitemap.xml            # Shop Map
```

**WARNING:** Do not add "junk" folders. Keep the work zone clear of debris.

---

## 5.0 SHIPPING (Deployment)

We use **Netlify** as our shipping container. The deployment is atomic and immutable.

### 5.1 Configuration (`netlify.toml`)

The repository includes a `netlify.toml` file that defines the shipping parameters.

- **Build Command:** (Empty). We ship raw HTML.
- **Publish Directory:** `.` (Root).

### 5.2 Connecting the Pipe (First Run)

1. Log in to Netlify.
2. Select **"Import from Git"**.
3. Choose this repository (`cooper-st-logic-shop`).
4. **Build Settings:**
   - _Build Command:_ Leave blank.
   - _Publish Directory:_ `.`
5. Click **Deploy Site**.

### 5.3 Domain Binding

1. Navigate to **Domain Management** in Netlify.
2. Add custom domain: `cooperstlogicshop.com`.
3. Update DNS records (A Record / CNAME) at your registrar to point to Netlify's load balancers.
4. **SSL:** Netlify will automatically provision a Let's Encrypt certificate. This is non-negotiable.

---

## 6.0 STANDARD OPERATING PROCEDURES (SOP)

### SOP-01: Updating Content

1. Edit `index.html`.
2. [Ensure text hierarchy follows the "Fraunces" (Header) vs "Public Sans" (Body) rule.
3. Run `npm run format`.
4. Commit and Push.

   ```bash
   git add .
   git commit -m "Update: Revised copy for Q1 Strategy"
   git push origin main
   ```

5. Netlify triggers a deploy automatically.

### SOP-02: Adding Images

1. **Process:** All images must be desaturated, high-contrast, and halftoned.
2. **Storage:** Save processed images to `assets/img/`.

---

## 7.0 LICENSE & LEGAL

**Proprietary / Closed Source.**
The visual identity, including the "Cooper St" wordmark, the "Structural C" icon, and the specific CSS implementation of the "Materiality Engine," is the property of Cooper St Logic Shop.

- **Code License:** UNLICENSED (All rights reserved).
- **Font Licenses:**
  - _Fraunces:_ OFL (Open Font License).
  - _Public Sans:_ OFL (Open Font License).
  - _IBM Plex Mono:_ OFL (Open Font License).

---

© 2026 Dylan Webster. Santa Cruz, California.
