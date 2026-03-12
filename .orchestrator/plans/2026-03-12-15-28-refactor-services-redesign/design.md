# Design: Services Redesign

## Architecture Overview
The current 3D gallery uses WebGL planes to create the "card" illusion, overlaid with `<Html>` nodes from `@react-three/drei`. To drastically improve legibility and "cleanliness" of the text while retaining the 3D effect, we will shift the glass effect / background responsibility partially or entirely to the `<Html>` node itself. 

## Component Design

### 3D Plane Mesh
- Maintain the spatial rotation (`0.08` / `-0.08`) and Z positioning.
- We might reduce the physical mesh opacity or simply let the `<Html>` backdrop do the heavy lifting for text contrast.

### HTML Node updates
- Add `bg-[#0a0a0a]/90` and `backdrop-blur-md` to the `.p-8` container.
- Add `border border-white/10` to frame the text nicely instead of relying solely on the 3D line edges.
- Typography: 
  - Subtitle/Number label: smaller, accent color or `opacity-50`, to reduce footprint.
  - Title: Clear, leading relaxed.
  - Desc: text-text-muted, ensure line-height is optimal.

## File Structure
- `src/sections/ServicesSection.jsx` (Modified)

## Dependencies
- `@react-three/drei`, `framer-motion`, `three` (Existing)

## Testing Strategy
- Visual test the scroll effect in the browser.
- Check readability of text at extreme scroll velocities.
