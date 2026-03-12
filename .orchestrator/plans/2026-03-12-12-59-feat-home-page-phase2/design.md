# Design: Phase 2 — Home Page

## Architecture Overview
La página `Home.jsx` se compondrá de múltiples secciones, abstrayendo cada una en un archivo dentro de `src/sections/` para que `Home.jsx` mantenga un esquema limpio (Orchestrator Pattern).

## Component Design

### Secciones (en `src/sections/`)
- `HeroSection.jsx`
  - Posición `relative` con 100vh.
  - Contiene `<Scene />` (Canvas WebGL) posicionado `absolute` cubriendo todo el background y con index-z bajo (-1 o 0).
  - Título superpuesto (pointer-events-none sobre él para que el mouse interactúe con el fondo a través del texto).
- `ServicesSection.jsx`
  - Usa GSAP ScrollTrigger. Cuando la sección entra, las cards de servicios escalan o suben en delay secuencial.
- `FeaturedWork.jsx`
  - Recibe array de 2 o 3 proyectos. Diseño asimétrico (una imagen gigante a la izquierda, la otra un poco más abajo a la derecha).
- `AboutPreview.jsx`
  - Una frase corta centrada en viewport, animando las palabras con nuestro componente `TextReveal`.
- `MarqueeSection.jsx`
  - Utiliza las clases `.animate-marquee` y `.animate-marquee-reverse` de Tailwind (definidas en fase 1) para rotar dos listas del tech stack de la página.

### WebGL / 3D (en `src/components/three/`)
- `Scene.jsx` -> Inicializa el `<Canvas>` de r3f. Incluye Camera, Luces y llama a `HeroGeometry.jsx`.
- `HeroGeometry.jsx` -> Usa `<Icosahedron>` o `<Sphere>` distorsionada. 
  - Usaremos un shader básico (Material Standard) y un poco de distorsión en el vertex mediante un hook `useFrame`.
  - Hará follow suave (lerp) a la rotación según la posición del cursor de la pantalla para reaccionar iterativamente al usuario. Para no bloquear el performance, se suscribirá un onPointerMove suave.

### UI Components adicionales (en `src/components/ui/`)
- Ninguno estricto adicional es requerido globalmente, aprovecharemos los que hicimos: `MagneticButton`, `TextReveal`.

## Implementación GSAP y Lenis Sync
Para que ScrollTrigger y Lenis no entren en conflicto, Lenis y GSAP ScrollTrigger no necesitan mucho bridging aparte de un requestAnimationFrame compartido, pero dado que usamos rAF nativo en `useLenis`, normalmente GSAP corre independientemente y Lenis simplemente maneja el scroll nativo fluído. 

## Data Model (Mocks Needed)
Crearemos el fichero `src/data/services.js`:
```js
export const services = [
  {
    id: '01',
    title: 'Desarrollo Web & Creative Coding',
    description: 'Interfaces memorables, 3D WebGL, optimización de performance y experiencias interactivas que destacan tu marca.'
  },
  {
    id: '02',
    title: 'Ingeniería AI & Agentes',
    description: 'Automatizaciones, flujos ML, integraciones LLMs y agentes autónomos para escalar el core técnico e inteligencia de tu negocio.'
  },
  {
    id: '03',
    title: 'Sistemas Backend & Arquitectura',
    description: 'APIs escalables, microservicios robustos y arquitecturas orientadas a eventos diseñadas para seguridad y alta concurrencia.'
  }
];
```
Y consumiremos `src/data/projects.js`.
