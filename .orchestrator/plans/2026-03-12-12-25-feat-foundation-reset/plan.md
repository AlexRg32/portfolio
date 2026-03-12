# Plan: Foundation Reset
> Goal: Establish the complete foundation infrastructure for the creative developer portfolio (dark B/N, Clash Display, routing, animations, custom cursor, grain overlay)
> Architecture: React 19 + Vite + Tailwind + React Router + Framer Motion + GSAP + Lenis + R3F

## Foundation

- [ ] **Task 1: Install Dependencies** — `package.json`
  - What: Install react-router-dom, framer-motion, gsap, @gsap/react, lenis, three, @react-three/fiber, @react-three/drei, clsx
  - Verify: `npm ls react-router-dom framer-motion gsap lenis three` shows all installed

- [ ] **Task 2: Download Clash Display Font** — `public/fonts/`
  - What: Download Clash Display font files (woff2) from fontshare and place in public/fonts/
  - Verify: Font files exist in public/fonts/

- [ ] **Task 3: Clean Old UI Files** — `src/sections/`, `src/components/old`
  - What: Remove old sections (Hero, About, Experience, Projects, Contact, Footer), old components (Navbar, ProjectCard, Section, ThemeToggle), App.css. Keep src/data/ and src/assets/
  - Verify: Old section/component files deleted, data files remain

- [ ] **Task 4: Design System — Tailwind Config** — `tailwind.config.js`
  - What: Rewrite tailwind config with B/N color tokens (bg, surface, text, border), Clash Display font family, custom spacing, animation keyframes
  - Verify: File has new color palette and font config

- [ ] **Task 5: Design System — Global CSS** — `src/index.css`
  - What: Rewrite with @font-face for Clash Display, base styles (bg black, text white), grain overlay CSS, smooth scroll, utility classes
  - Verify: CSS has font-face declarations, dark base styles

- [ ] **Task 6: Constants & Animation Variants** — `src/utils/`
  - What: Create constants.js (nav links, social links, color values) and animations.js (Framer Motion variants: fadeUp, fadeIn, scaleIn, stagger, slideIn, pageTransition)
  - Verify: Files export expected constants and variants

## Core

- [ ] **Task 7: Custom Hooks** — `src/hooks/`
  - What: Create useMousePosition (tracks mouse x,y), useLenis (initializes smooth scroll), useScrollDirection (up/down for navbar)
  - Verify: Hooks export correctly, no import errors

- [ ] **Task 8: GrainOverlay Component** — `src/components/ui/GrainOverlay.jsx`
  - What: Fixed overlay covering viewport with CSS noise texture at very low opacity (~3-5%), pointer-events: none
  - Verify: Component renders without errors

- [ ] **Task 9: CustomCursor Component** — `src/components/layout/CustomCursor.jsx`
  - What: Small dot (8px) that follows mouse with slight lag (lerp), expands on hovering links/buttons. Hidden on mobile/touch.
  - Verify: Component renders, cursor hidden on default

- [ ] **Task 10: TextReveal Component** — `src/components/ui/TextReveal.jsx`
  - What: Wraps children text, splits by word, each word fades up when parent enters viewport using Framer Motion
  - Verify: Component renders children text

- [ ] **Task 11: MagneticButton Component** — `src/components/ui/MagneticButton.jsx`
  - What: Button wrapper that slightly translates toward cursor position when hovering. Uses requestAnimationFrame for smooth movement.
  - Verify: Component renders children as button

- [ ] **Task 12: Navbar Component** — `src/components/layout/Navbar.jsx`
  - What: Fixed navbar, transparent bg → blurred on scroll. Logo "AR" left, nav links right (Inicio, Trabajo, Sobre Mí, Contacto). Links use react-router Link. Hides on scroll down, shows on scroll up.
  - Verify: Navbar renders with links, routing works

- [ ] **Task 13: Footer Component** — `src/components/layout/Footer.jsx`
  - What: Minimal footer with copyright, social links (GitHub, LinkedIn), email link. Dark bg, white text.
  - Verify: Footer renders with links

- [ ] **Task 14: PageTransition Wrapper** — `src/components/layout/PageTransition.jsx`
  - What: Framer Motion wrapper for route transitions. Fade + slight Y translate on enter/exit.
  - Verify: Component wraps children with motion.div

## Integration & Polish

- [ ] **Task 15: Layout Component** — `src/components/layout/Layout.jsx`
  - What: Main layout with Navbar + Outlet + Footer. Initializes Lenis smooth scroll. Applied as route layout.
  - Verify: Layout renders navbar, outlet area, footer

- [ ] **Task 16: Placeholder Pages** — `src/pages/`
  - What: Create Home.jsx, Work.jsx, About.jsx, Contact.jsx as minimal placeholder pages with section title and PageTransition wrapper. Each page has min-h-screen, centered title text.
  - Verify: All 4 files created and export default components

- [ ] **Task 17: App Router Setup** — `src/App.jsx`
  - What: Full rewrite. BrowserRouter with Routes: "/" (Home), "/work" (Work), "/about" (About), "/contact" (Contact). Layout as parent route. CustomCursor + GrainOverlay rendered globally.
  - Verify: All routes accessible, no console errors

- [ ] **Task 18: Update index.html & main.jsx** — `index.html`, `src/main.jsx`
  - What: Update title to "Alejandro Ruiz — Creative Developer". Remove old font preconnects (will use local font). Update main.jsx imports.
  - Verify: Browser shows correct title

- [ ] **Task 19: Build Verification** — terminal
  - What: Run `npm run build` and verify no errors
  - Verify: Build completes successfully, dist/ generated

- [ ] **Task 20: Dev Server Smoke Test** — browser
  - What: Run dev server, navigate all 4 routes, verify: smooth scroll works, cursor visible on desktop, grain overlay visible, navbar shows/hides, page transitions animate
  - Verify: All features functional in browser
