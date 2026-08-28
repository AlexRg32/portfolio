# Changelog

All notable changes to this project are documented in this file.

## [0.2.0.0] - 2026-08-28

### Changed

- Repositioned the site from a job-seeking portfolio to an independent digital
  studio aimed at winning design and development projects. “Empezar un proyecto”
  is now the primary action on every page.
- Rebuilt the visual system around semantic tokens: ink, warm paper, deep paper
  and a single cobalt accent, with Archivo Variable and IBM Plex Mono.
- Rewrote the home page as a commercial narrative: hero, credibility ticker,
  selected work, commercial thesis, services, process, who you work with, and a
  briefing form.
- Rebuilt the three case studies as sales arguments: business problem, objective,
  responsibility, scope, decisions and real desktop/mobile captures.

### Added

- AR monogram used as signature, intro, cursor, lattice and footer mark.
- Signature WebGL layer: an AR lattice behind the headline, lazy-loaded, capped
  at 1.4 DPR, paused off-screen and never mounted on touch or reduced motion.
- A single motion system (GSAP + ScrollTrigger + Lenis) with shared durations,
  eases and staggers, and View Transitions between the work list and each case.
- Briefing form backed by Netlify Forms, with a honeypot, real submit states and
  a working no-JavaScript fallback.
- Static prerendering now emits the real markup for every route, so all content
  is present and indexable without JavaScript.
- Metric-matched fallback font, removing the font-swap layout shift.
- Real mobile and secondary desktop captures of the three live client sites.

### Fixed

- Text contrast now meets WCAG AA on every route.
- `npm run preview` resolves prerendered routes and the 404 document the way
  Netlify does.
- Hashed build chunks are no longer removed by the asset prune step.
- Updated React Router to its patched release after a high-severity security
  advisory in the previously resolved dependency tree.

## [0.1.0.3] - 2026-07-22

### Fixed

- Reduced the contact section height and resized “¿Hablamos?” so it stays fully visible on mobile.

## [0.1.0.2] - 2026-07-16

### Changed

- Reframed the personal hero photo with a wider source crop and a larger editorial layout.
- Reduced horizontal overflow across the page and refined the mobile portrait sizing.

## [0.1.0.1] - 2026-07-15

### Added

- Added the original Rigby and Grup Mediapro logos to the experience timeline.

### Changed

- Balanced logo sizing and alignment across desktop and mobile layouts.

## [0.1.0.0] - 2026-07-15

### Added

- Minimal bilingual portfolio with dedicated project case studies and prerendered metadata.
- Personal hero portrait and an editorial project list with complete, uncropped website captures.
- Mónica Gallardo Estilistas, Autoescuela D’Click and Espectáculos Baluarte as selected projects.

### Changed

- Rebuilt the visual system around a clean ivory, charcoal and stone palette.
- Reduced the copy across the homepage, experience, profile and contact sections.
- Simplified navigation, responsive layouts, footer links and SEO metadata.

### Removed

- Removed La Bandida Burger and the previous multi-page portfolio implementation.
