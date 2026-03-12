# Design: Foundation Reset

## Architecture Overview
> Fresh start con React 19 + Vite. Migramos de SPA single-page a multi-page con React Router. Toda la infraestructura de animación (Lenis, GSAP, Framer Motion) se inicializa en el layout root. Design system puramente B/N con Clash Display.

## Component Design

### Component Tree
```
App.jsx (BrowserRouter)
├── CustomCursor (global, pointer-events: none)
├── GrainOverlay (global, pointer-events: none)
└── Layout.jsx (Outlet wrapper)
    ├── Navbar.jsx (fixed, hide/show on scroll)
    ├── <Outlet /> (pages rendered here with AnimatePresence)
    │   ├── Home.jsx (placeholder)
    │   ├── Work.jsx (placeholder)
    │   ├── About.jsx (placeholder)
    │   └── Contact.jsx (placeholder)
    └── Footer.jsx (minimal)
```

### UI Components (src/components/ui/)
- **TextReveal** — Wraps children text, splits by word, animates each word on scroll into viewport
- **MagneticButton** — Button that follows cursor slightly within its bounds (requestAnimationFrame)
- **GrainOverlay** — Fixed overlay with CSS noise texture, opacity ~0.03
- **Marquee** — Infinite horizontal scroll ticker (placeholder for Phase 2)
- **SplitText** — Utility to split text into spans per char/word for GSAP/FM animation

### Layout Components (src/components/layout/)
- **Navbar** — Fixed top, transparent bg, logo left, nav links right, scrolled state
- **Footer** — Minimal with social links
- **PageTransition** — Framer Motion AnimatePresence wrapper for route changes
- **CustomCursor** — SVG/div dot that follows mouse with gsap.to lerp

### State Management
- Scroll state: Lenis instance via context or ref
- Cursor state: useMousePosition hook + React context for cursor variant (default/hover/project)
- Theme: Always dark, no toggle needed
- Navigation: React Router DOM

## File Structure
```
src/
├── main.jsx                    [MODIFIED — remove old imports]
├── App.jsx                     [REWRITE — Router + Layout]
├── index.css                   [REWRITE — design system]
├── components/
│   ├── layout/
│   │   ├── Layout.jsx          [NEW]
│   │   ├── Navbar.jsx          [NEW — complete rewrite]
│   │   ├── Footer.jsx          [NEW — complete rewrite]
│   │   ├── PageTransition.jsx  [NEW]
│   │   └── CustomCursor.jsx    [NEW]
│   └── ui/
│       ├── TextReveal.jsx      [NEW]
│       ├── MagneticButton.jsx  [NEW]
│       ├── GrainOverlay.jsx    [NEW]
│       └── SplitText.jsx       [NEW]
├── pages/
│   ├── Home.jsx                [NEW — placeholder]
│   ├── Work.jsx                [NEW — placeholder]
│   ├── About.jsx               [NEW — placeholder]
│   └── Contact.jsx             [NEW — placeholder]
├── hooks/
│   ├── useMousePosition.js     [NEW]
│   ├── useLenis.js             [NEW]
│   └── useScrollDirection.js   [NEW]
├── utils/
│   ├── animations.js           [NEW — FM variants]
│   └── constants.js            [NEW]
├── data/                       [KEEP — existing data files]
│   ├── projects.js
│   ├── profile.js
│   ├── experience.js
│   └── skills.js
└── sections/                   [DELETE — will rebuild in Phase 2]
```

## Dependencies
- New packages: react-router-dom, framer-motion, gsap, @gsap/react, lenis, three, @react-three/fiber, @react-three/drei, clsx
- Remove: None (keeping all existing)

## Testing Strategy
- Manual: Dev server renders without errors
- Visual: All 4 routes navigable, cursor visible, grain visible, smooth scroll working
- Build: `npm run build` passes
