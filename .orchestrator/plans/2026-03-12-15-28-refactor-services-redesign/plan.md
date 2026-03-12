# Plan: Services Redesign
> Goal: Make the 3D services cards cleaner, easier to read, and maintain the cool floating effect.
> Architecture: Keep WebGL floating Float planes but update `<Html>` DOM overlays with robust glassmorphism UI for max contrast and legibility.

## Core

- [x] **Task 1: Redesign Services Card HTML** — `src/sections/ServicesSection.jsx`
  - What: Update the `<div>` inside `<Html>` to act as a proper dark glass card: `bg-[#0a0a0a]/80 backdrop-blur-md rounded-xl p-8 border border-white/10`. Tweak text sizes and weights to guarantee legibility (e.g. `font-medium`, proper spacing, move number `01` to be less intrusive). Remove the overly bright glowing border from the WebGL lineSegments if it visually competes with the new UI.
  - Verify: Run `npm run dev`, scroll through the Services section, text should be crisp and high-contrast against the dark backdrop.

## Integration & Polish

- [x] **Task 2: WebGL Scene Fine-tuning** — `src/sections/ServicesSection.jsx`
  - What: Refine the `meshPhysicalMaterial` (reduce its opacity or remove it if the HTML backdrop blur is enough, or set `opacity={0.3}` to just leave a subtle glass volume). Adjust floating speeds or angles slightly if needed to keep it feeling light and premium without dizzying text jitter.
  - Verify: Scroll through Services section and verify smooth 3D parallax without clutter.
