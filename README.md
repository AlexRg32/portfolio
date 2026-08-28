# alexrg.es — Alejandro Ruiz

Web del estudio digital independiente de Alejandro Ruiz (Alicante).
Producción: <https://alexrg.es>

La web está orientada a captar proyectos de diseño y desarrollo web. La acción
principal en todas las páginas es **Empezar un proyecto**; CV, LinkedIn y GitHub
siguen presentes como prueba de criterio, sin competir con esa acción.

## Stack

- React 19 + Vite 7 + React Router 7
- GSAP + ScrollTrigger (sistema de motion), Lenis (scroll), Three.js (una sola
  experiencia WebGL, cargada en diferido)
- CSS propio con tokens semánticos (`src/styles/tokens.css`)
- Prerender estático de todas las rutas con `react-dom/server`
- Despliegue en Netlify; el briefing usa Netlify Forms

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run lint     # eslint
npm run build    # build de cliente + build SSR + prune de assets + prerender
npm run preview  # sirve dist/ tal y como lo hace Netlify (rutas y 404 incluidos)
```

`npm run build` deja en `dist/` un HTML completo por ruta —con el marcado ya
renderizado— para `/`, `/en`, los tres casos en ES/EN, privacidad ES/EN y `404`.

## Estructura

```
src/
  data/content.js      Todo el contenido bilingüe y los datos de proyecto
  data/monogram.js     Geometría del monograma AR (SVG y WebGL)
  styles/              tokens · base · layout · home · pages
  motion/              config (duraciones, eases), scroll suave, reveals
  components/          layout, formulario, cursor, intro, monograma
  components/sections/ secciones de la home
  components/lattice/  experiencia WebGL (chunk diferido)
  pages/               Home · CaseStudy · Privacy · NotFound
  entry-server.jsx     Entrada usada por el prerender
scripts/
  prerender-routes.mjs Renderiza cada ruta a HTML e inyecta metadatos
  prune-public-assets.mjs
```

## Contenido

`src/data/content.js` es la única fuente de contenido. No contiene clientes,
premios, testimonios ni métricas inventadas: cuando falta un dato comercial se
usa el marcador `PENDIENTE_CLIENTE` y nunca se renderiza como afirmación.

## Formulario

El briefing se envía a Netlify Forms con el nombre `briefing`. La declaración
estática vive en `index.html` para que el bot de Netlify la registre en el build;
el formulario real es un `POST` normal, así que sigue funcionando sin JavaScript.
Requiere tener **Forms** activado en el sitio de Netlify.

## Accesibilidad y motion

- Todo el contenido es legible sin JavaScript y sin WebGL.
- Con `prefers-reduced-motion: reduce` no se monta Lenis, ni WebGL, ni cursor,
  ni la intro; los reveals no llegan a ocultar nada.
- Contraste WCAG AA verificado en todas las rutas; zoom hasta 400% sin scroll
  horizontal.
