# Investigation: Phase 2 — Home Page (El Golpe Visual)

## Summary
En esta fase vamos a reemplazar el placeholder de `Home.jsx` por una landing page altamente sofisticada y visual. El objetivo es conseguir ese "efecto WOW" desde el primer frame con una escena WebGL y animaciones ligadas al scroll.

## Current State
- `src/pages/Home.jsx` tiene animaciones Framer Motion básicas pero sin contenido real, excepto un CTA y títulos estáticos.
- Dependencias clave (`three`, `@react-three/fiber`, `gsap`, `framer-motion`, `lenis`) ya están instaladas y la infraestructura corre perfectamente.
- Datos: Existen `profile.js`, `projects.js` pero NO exite `services.js`.
- Necesitamos crear componentes interactivos más complejos que los de Phase 1.

## Requirements from Tactical Plan

### Funcionales
- [ ] **Hero Section (WebGL):** 100vh oscuro con R3F (React Three Fiber). Objeto cristalino/abstracto que reacciona sutilmente al mouse. Título oversized.
- [ ] **Services Section:** Grid minimalista de servicios con GSAP ScrollTrigger para staggered reveals. Necesitamos archivo `data/services.js`.
- [ ] **Featured Work:** Mostrar 2 o 3 proyectos grandes en layout editorial, con reveals de imagen e interacciones parallax al hover.
- [ ] **About Preview:** Phrase narrativa potente y texto revelado palabra por palabra (`TextReveal` que ya construimos).
- [ ] **Marquee:** Ticker infinito de doble capa para stack tecnológico.
- [ ] **CTA:** Un CTA interactivo al final para mandar un email.

### Riesgos y Consideraciones
| Risk | Impact | Mitigation |
|------|--------|------------|
| Render Performance de WebGL con Framer Motion y Lenis combinados | Alto | Usar `<Suspense>` para el canvas 3D, desactivar sombras complejas, usar shader parameters de baja resolución y evitar render loops on-scroll pesados. |
| Incompatibilidad de GSAP ScrollTrigger con Lenis | Medio | Registrar Lenis ticker global en gsap.ticker en un `useIsomorphicLayoutEffect` o hook específico en el lugar donde usemos GSAP. |

## Necesidades de Datos / Mocks
- `services.js`: Vamos a configurar 4 servicios alineando a: "Desarrollo Web & Apps", "Inteligencia Artificial & Agentes", "Arquitectura Backend", y "Creative Coding".
- `projects.js`: Seleccionar los 2 proyectos que tengan foto/id que mejor representen el portfolio avanzado para Feature Work.
