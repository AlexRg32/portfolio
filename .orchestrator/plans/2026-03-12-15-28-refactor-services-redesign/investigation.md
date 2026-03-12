# Investigation: Services Redesign

## Summary
The user wants to redesign the 3D cards in the Services ("Qué puedo hacer por ti") section. The goal is to make the design cleaner, minimalist, and easier to digest while keeping the core 3D spatial effect. Above all, the text must be highly legible.

## Current State
- **Tech Stack**: React, Three.js, React Three Fiber, Framer Motion, Tailwind CSS.
- **Relevant Code**: `src/sections/ServicesSection.jsx`
- **Architecture**: A 3D WebGL camera scrolls along the Z-axis, passing floating cards. The text is rendered via `@react-three/drei`'s `Html` component.

## Requirements
### Functional
- [ ] Improve text legibility inside the 3D layout.
- [ ] Simplify card layout while keeping the premium spatial scroll effect.

### Non-Functional
- Maintain the dark, premium aesthetic.

## Scope
### In Scope
- `src/sections/ServicesSection.jsx` WebGL and HTML overlays.

### Out of Scope
- Modifying `services.js` data, unless adding short bullet points is strictly necessary (will avoid to keep it simple).

## Recommendation
Apply a glassmorphism/dark-card effect directly to the HTML DOM nodes. By putting a dark, semi-transparent background right behind the text in the `<Html>` block, the contrast will be robust regardless of 3D lighting. Adjust font sizing, spacing, and use subtle borders to frame the content elegantly. Reduce physical mesh complexity if it conflicts with the HTML overlay.
