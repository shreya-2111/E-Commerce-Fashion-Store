# MODA | Luxury E-Commerce Fashion Store

A modern, minimal, fully responsive fashion storefront inspired by the structural performance design of **Nike** and the minimalist editorial layouts of **Zara**. Built using **React.js (Vite)**, **HTML5**, **CSS3 (Pure CSS, Tailwind-Free)**, and **JavaScript (ES6+)**.

Optimized for instant, zero-configuration deployment to **GitHub Pages**.

---

## 🌟 Key Features

* **High-Aesthetic Minimal Design**: A luxurious, high-contrast, dark/light editorial theme built with premium typography (`Syne` for headings, `Outfit` for body) and glassmorphism panels.
* **Responsive Layout**: Mobile-first design adapting smoothly across mobile, tablet, and ultra-wide desktop grids.
* **Stateful Navigation Header**: A sticky glassmorphic header tracking real-time wishlist and cart items, with a mobile sliding sidebar menu.
* **Multi-Image Cross-Fade Gallery**: Hovering over product listings switches photos instantly using a smooth cross-fade animation.
* **Instant Auto-Suggest Search**: Interactive search overlay listing live search match recommendations with product imagery on every keystroke.
* **Custom Filter & Sort Dashboard**: Filter listings by category, brand, rating metrics, or price range tracks alongside sort capabilities (price, popularity).
* **Granular Cart Drawer & Checkout**:
  * Adjust quantities or remove items dynamically.
  * Stateful mock coupon system (codes: `WELCOME10` for 10% off, `NIKE20` for 20% off, `ZARA30` for 30% off).
  * Real-time billing summary tracking subtotals, shipping handling limits, coupon deductions, and totals.
* **Multi-Step Secure Checkout Form**: Billing/shipping validation fields leading to a secure order generation panel.
* **LocalStorage Sync**: Persistent user configurations (Cart items, Wishlist reviews, and Dark/Light theme values).
* **Framer Motion Transitions**: Micro-interactions, slide-out drawer sheets, and stagger-reveal cards.

---

## 🛠️ Technology Stack

* **Core Library**: React.js 19 (via Vite)
* **Routing**: React Router DOM 7 (using `HashRouter` to prevent GitHub Pages refresh 404s)
* **Global State**: React Context API
* **Icons**: React Icons (Feather Icons pack)
* **Animations**: Framer Motion
* **Styling**: Pure CSS3 variables & custom flex/grid structures (No Tailwind, fully modular)

---

## 📂 Project Directory Structure

```text
src/
├── assets/         # App asset assets
├── components/     # Reusable global UI widgets
│   ├── CartDrawer.jsx       # Sliding bag drawer
│   ├── FilterSidebar.jsx    # Catalog filter layout
│   ├── Footer.jsx           # Editorial brand footer
│   ├── HeroSection.jsx      # Framer Motion fullscreen banner
│   ├── LoaderSkeleton.jsx   # Shimmer loading cards
│   ├── Navbar.jsx           # Sticky responsive navigation
│   ├── ProductCard.jsx      # Dual photo cross-fade card
│   ├── ProductGrid.jsx      # Layout grids with loading support
│   ├── SearchBar.jsx        # Autofocus search suggestions dropdown
│   ├── ThemeToggle.jsx      # Dark / light toggle button
│   └── WishlistButton.jsx   # Animated fav heart icon
├── context/
│   └── ShopContext.jsx      # Core global state (cart, wishlist, theme)
├── data/
│   ├── brands.js            # Mock brands info (Nike, Zara, etc)
│   ├── categories.js        # Mock category links
│   └── products.js          # Core fashion catalog database
├── pages/          # View routes
│   ├── About.jsx            # Editorial concept story
│   ├── Cart.jsx             # Detailed bag breakdown
│   ├── Checkout.jsx         # Secure multi-step form & order confirmation
│   ├── Contact.jsx          # Form messaging panel
│   ├── Home.jsx             # Category showcase, trending grid, testimonials
│   ├── NotFound.jsx         # 404 page
│   ├── ProductDetails.jsx   # Interactive gallery, sizing, reviews, & related items
│   ├── Shop.jsx             # Catalog listings & filters panel
│   └── Wishlist.jsx         # Saved items catalog
├── App.css
├── App.jsx                  # Main routing directory
├── index.css                # Global stylesheet containing core styling variables
└── main.jsx                 # Document root mount
```

---

## 🚀 Installation & Local Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development mode**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` to explore the store.

3. **Build the production bundle**:
   ```bash
   npm run build
   ```

---

## 📦 GitHub Pages Deployment

The storefront base paths and router are pre-configured to build static files for GitHub Pages.

1. **Verify base paths**:
   Ensure `base` in `vite.config.js` and `homepage` in `package.json` point to your repository.
   * Currently set to repository folder: `/fashion-store/`

2. **Deploy to GitHub Pages**:
   Run the deployment command:
   ```bash
   npm run deploy
   ```
   This will automatically build production assets (`predeploy`) and upload them to the `gh-pages` branch.
