# Plan: Phase 2 — Home Page Implementation

- [ ] **Task 1: Preparar Data**
  - Crear `src/data/services.js` con el listado de servicios.
  - Asegurar importaciones correctas.

- [ ] **Task 2: UI Component — Scene y Geometría 3D** (WebGL)
  - Crear `src/components/three/HeroGeometry.jsx` que contiene el objeto abstracto con rotación por mouse, utilizando ref y lerp.
  - Crear `src/components/three/Scene.jsx` con el setup de R3F (`<Canvas>`, `<ambientLight>`, `<pointLight>`) importando `HeroGeometry`.
  - Asegurar lazy loading (`<Suspense>`) de la escena.

- [ ] **Task 3: HeroSection**
  - Crear `src/sections/HeroSection.jsx`.
  - Debe contener la tipografía "ALEJANDRO RUIZ" con animaciones y el ScrollIndicator.
  - Incorporar `<Scene />` de R3F en el background como wrapper absoluto `z-0`. El texto estará en `z-10`.

- [ ] **Task 4: ServicesSection**
  - Crear `src/sections/ServicesSection.jsx`.
  - Iterar el objeto `services` y mostrar las cards en un grid responsivo.
  - Opcional: implementar ScrollTrigger o `Framer Motion` target viewport variants (usaremos framer motion `whileInView` para consistencia basandonos en la infraestructura fase 1, dado que ya tenemos variants hechas, podemos prescindir de instalar ScrollTrigger complejo si FM hace lo mismo, o implementar ScrollTrigger clásico). _Decisión: Usar las variants de Framer Motion de `animations.js` por consistencia estricta en todo el layout._

- [ ] **Task 5: FeaturedWork Section**
  - Crear `src/sections/FeaturedWork.jsx`.
  - Obtener del array global 2 objetos de `projects.js`.
  - Crear layout editorial (imagen left on right) y añadir `MagneticButton` para navegar a detalle.
  - Implementar parallax en hover con CSS clip-path/opacity y transform en la imagen interior usando los variants.

- [ ] **Task 6: MarqueeSection y AboutPreview**
  - Crear `src/sections/MarqueeSection.jsx` para el ticker infinito.
  - Crear `src/sections/AboutPreview.jsx` usando `TextReveal` del skill de creative-coding.

- [ ] **Task 7: Ensamblar todo en Home**
  - Actualizar `src/pages/Home.jsx`.
  - Eliminar los placeholders locales y hacer un layout de importación: `HeroSection` -> `ServicesSection` -> `FeaturedWork` -> `AboutPreview` -> `MarqueeSection` -> Contact section (placeholder actual simplificado).

- [ ] **Task 8: Validar Rendering y Perf (Build Test)**
  - Comprobar que compila correctamente y no lanza warnings de ThreeJS ni context.
