# Investigation: Foundation Reset — Creative Developer Portfolio

## Summary
> Fresh start del proyecto portfolio para transformarlo en una web de creative developer al nivel de Dogstudio/Resn/Synchronized Studio. La Fase 1 establece la infraestructura fundamental: design system (dark B/N + Clash Display), routing multi-página, smooth scroll, custom cursor, page transitions y sistema de animaciones. Todo sobre el stack actual React 19 + Vite 7 + Tailwind 3.4.

## Current State
- **Tech Stack**: React 19, Vite 7, Tailwind CSS 3.4, solo Inter font
- **Architecture**: SPA single-page con scroll anchors, sin routing
- **Relevant Code**: Todo en `src/` — 6 sections, 4 components, 4 data files
- **Assets**: 7 imágenes de proyectos en `public/assets/`, 1 profile photo, 1 favicon
- **Animaciones**: Solo CSS transitions básicas (hover translate-y, blur blobs)
- **3D/WebGL**: No existe
- **Smooth Scroll**: No existe (scroll nativo)

## Requirements

### Functional
- [ ] Multi-page routing (/, /work, /about, /contact)
- [ ] Design system B/N con Clash Display + Inter
- [ ] Lenis smooth scroll global
- [ ] Custom cursor con estados (dot → expand)
- [ ] Page transitions cinemáticas
- [ ] Framer Motion animation variants reutilizables
- [ ] TextReveal component para scroll-driven text animation
- [ ] MagneticButton component
- [ ] GrainOverlay sutil sobre toda la app
- [ ] Navbar minimalista con hide/show on scroll

### Non-Functional
- Performance: Smooth 60fps en animaciones
- Fonts: Preload Clash Display localmente (no CDN)
- Responsive: Mobile-first
- Accessibility: prefers-reduced-motion support

## Scope

### In Scope
- Limpieza del proyecto (borrar old sections/components)
- Instalar dependencias nuevas (react-router-dom, framer-motion, gsap, lenis, three, r3f, drei, clsx)
- Design system completo (colors, typography, spacing en tailwind.config)
- Routing y layout shell (Navbar + Outlet + Footer)
- Infraestructura de animación (variants, hooks, components)
- Custom cursor
- GrainOverlay
- Placeholder pages (shell vacío de Home, Work, About, Contact)

### Out of Scope
- Contenido real de las páginas (Fase 2+)
- 3D/WebGL scene (Fase 2)
- SEO avanzado (Fase 4)
- Deploy (Fase 5)

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Clash Display no disponible como web font gratuito | Medio | Usar fontshare.com (gratuito) o alternativa similar |
| GSAP licensing para uso comercial | Bajo | GSAP es gratis para sitios que no son SaaS |
| Performance de smooth scroll en mobile | Medio | Lenis tiene buen soporte mobile; test temprano |
| Bundle size con Three.js + GSAP + FM | Medio | Tree shaking + lazy load Three.js solo en Home |

## Recommendation
> Fresh start manteniendo `public/assets/` y `src/data/`. Borrar toda la UI actual. Instalar stack completo de animación. Configurar routing y design system como primera prioridad.
