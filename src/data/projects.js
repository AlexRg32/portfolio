export const projects = [
  {
    id: 3,
    priority: 2,
    title: 'Saloria',
    description:
      'SaaS para gestión de citas, servicios, empleados y operativa diaria, planteado como base de producto escalable.',
    techStack: ['Spring Boot', 'React', 'Docker', 'PostgreSQL'],
    image: '/assets/gestipelu.jpg',
    liveLink: 'https://saloria.vercel.app',
    status: 'En desarrollo',
    featured: true,
    caseStudy: {
      summary:
        'Proyecto orientado a producto donde la prioridad está en estructurar bien la operativa diaria, el modelo de negocio y la base técnica para futuras iteraciones.',
      teamContext:
        'Producto propio en evolución, planteado para validar una herramienta de gestión real y preparar una base sólida para crecimiento.',
      role: 'Arquitectura web, definición de módulos, experiencia de gestión y estructuración técnica del sistema.',
      challenge:
        'El sistema debía cubrir reservas, personal, servicios y lectura del negocio sin convertirse en una herramienta compleja o difícil de mantener.',
      solution: [
        'Se separaron claramente los dominios principales de gestión para que reservas, empleados, servicios y analíticas pudieran evolucionar sin mezclar responsabilidades.',
        'La interfaz se diseñó para uso diario, priorizando formularios claros, estados comprensibles y una lectura rápida del sistema desde panel.',
      ],
      technicalDecisions: [
        'Separación entre capa de gestión, datos de negocio y experiencia diaria del usuario.',
        'Stack orientado a escalabilidad con backend robusto y frontend desacoplado.',
        'Énfasis en mantenibilidad y estructura evolutiva antes que en sumar features rápidas sin base.',
      ],
      deliverables: ['Plataforma SaaS', 'Panel de control', 'Flujos operativos', 'Base técnica escalable'],
      outcomes: [
        'Base sólida para seguir construyendo producto sin tener que rehacer módulos nucleares.',
        'Mejor control unificado de citas, equipo y servicios en una sola herramienta.',
      ],
    },
  },
  {
    id: 1,
    priority: 1,
    title: 'Fichatec - Gestión de Ingredientes y Alérgenos',
    description:
      'SaaS profesional para fichas técnicas, ingredientes y alérgenos en un entorno de producto real dentro del sector alimentario.',
    techStack: ['Laravel', 'JavaScript', 'MySQL', 'Bootstrap'],
    image: '/assets/fichatec.jpg',
    liveLink: 'https://www.fichatec.com/tour/',
    featured: true,
    caseStudy: {
      summary:
        'Trabajo en entorno profesional sobre un SaaS ya en uso, mejorando flujos, comportamiento e interfaz para operativa real.',
      teamContext:
        'Proyecto en entorno profesional dentro de Infoexpo, colaborando sobre un SaaS especializado y en uso real.',
      role: 'Desarrollo web orientado a producto, mejora de flujos internos y aterrizaje de funcionalidades.',
      challenge:
        'Había que hacer más manejable información técnica y sensible sin aumentar fricción para el usuario ni comprometer la evolución del sistema.',
      solution: [
        'Se reforzaron flujos de trabajo donde el usuario necesitaba actuar rápido y con contexto claro.',
        'Las mejoras se orientaron a que el sistema fuese más predecible, menos costoso de usar y más fácil de evolucionar con nuevas funcionalidades.',
      ],
      technicalDecisions: [
        'Trabajo sobre un producto existente, respetando restricciones y continuidad funcional.',
        'Mejora progresiva de interfaces y comportamiento sin romper operativa en uso.',
        'Colaboración cercana con equipo y requisitos reales para priorizar entregables con impacto.',
      ],
      deliverables: ['Flujos SaaS', 'Gestión de datos', 'Mejoras de interfaz', 'Herramientas internas'],
      outcomes: [
        'Flujos más claros para la gestión documental y técnica del producto.',
        'Mejor base para seguir iterando sobre funcionalidades sin rehacer procesos centrales.',
      ],
    },
  },
  {
    id: 4,
    priority: 4,
    title: "Autoescuela D'Click",
    description:
      'Landing de captación moderna y clara, diseñada para explicar oferta, cursos y contacto con una experiencia muy rápida de escanear.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/AUTOESCUELA.png',
    liveLink: 'https://autoescuela-dclick.netlify.app',
    featured: true,
    caseStudy: {
      summary:
        'Proyecto de ownership frontend casi completo, con foco en claridad de contenido, lectura en móvil y jerarquía de conversión.',
      teamContext:
        'Proyecto de cliente donde la responsabilidad principal estuvo en la capa de interfaz, el orden del contenido y la presentación digital.',
      role: 'Concepto visual, desarrollo frontend y jerarquía de contenido orientada a acción.',
      challenge:
        'La web tenía que explicar bien la oferta y guiar a contacto o matriculación rápida sin sensación de saturación.',
      solution: [
        'Se planteó una estructura de página directa, con mensajes cortos y bloques muy legibles desde móvil.',
        'Se aplicó una capa ligera de motion para reforzar la percepción de marca actual sin perjudicar lectura ni velocidad.',
      ],
      technicalDecisions: [
        'Jerarquía clara del contenido para reducir tiempo de comprensión.',
        'Uso de React y motion ligera para una interfaz viva pero controlada.',
        'Decisiones mobile-first en CTA y densidad de información.',
      ],
      deliverables: ['Landing de captación', 'Interfaz adaptable', 'Motion ligera', 'Optimización de CTA'],
      outcomes: [
        'Oferta principal más comprensible y mejor ordenada para usuarios nuevos.',
        'Camino de contacto más rápido desde móvil y escritorio.',
      ],
    },
  },
  {
    id: 5,
    priority: 3,
    title: 'Espectáculos Baluarte',
    description:
      'Web expositiva para una empresa de eventos con una presencia digital más inmersiva y un catálogo más fácil de recorrer.',
    techStack: ['React', 'Tailwind CSS', 'Vite'],
    image: '/assets/carrozas.png',
    liveLink: 'https://espectaculosbaluarte.netlify.app',
    featured: true,
    caseStudy: {
      summary:
        'Proyecto útil para demostrar criterio visual, composición editorial y ordenación de contenido expositivo con bastante carga visual.',
      teamContext:
        'Proyecto de escaparate visual con responsabilidad principal en estructura de contenido e impacto visual.',
      role: 'Dirección visual, interfaz y ordenación del contenido expositivo.',
      challenge:
        'Había que transmitir escala y personalidad sin que la navegación se volviera caótica o pesada.',
      solution: [
        'Se trabajó una composición amplia con imágenes protagonistas y ritmo visual claro.',
        'La jerarquía permitió dar visibilidad a distintas familias de espectáculos sin que compitieran entre sí.',
      ],
      technicalDecisions: [
        'Composición visual basada en bloques amplios y lectura progresiva.',
        'Equilibrio entre impacto visual y control de densidad para evitar ruido.',
        'Arquitectura frontend sencilla para priorizar carga y mantenimiento.',
      ],
      deliverables: ['Web escaparate', 'Jerarquía visual', 'Diseño adaptable', 'Estructura de contenidos'],
      outcomes: [
        'La marca gana una base digital más sólida para presentar servicios y propuestas.',
        'El catálogo se consulta con más claridad y mejor ritmo visual.',
      ],
    },
  },
  {
    id: 2,
    priority: 5,
    title: 'La Bandida Burger',
    description:
      'Web de marca para una hamburguesería local, con foco en identidad, velocidad de consulta y personalidad visual.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/la-bandida.png',
    liveLink: 'https://la-bandida.netlify.app',
    featured: true,
    caseStudy: {
      summary:
        'Proyecto donde el valor está sobre todo en identidad visual, ritmo de página y accesos rápidos a información práctica.',
      teamContext:
        'Proyecto de cliente local con foco en presencia de marca y experiencia digital rápida.',
      role: 'Concepto visual, interfaz y optimización de la experiencia de marca.',
      challenge:
        'La web debía reflejar personalidad y producto sin perder velocidad, legibilidad ni acceso rápido a la información que más busca el cliente.',
      solution: [
        'La estructura se resolvió como una página corta y muy visual, donde la marca, el producto y los accesos directos tuvieran prioridad absoluta.',
        'Se cuidó el ritmo de animación para sumar energía sin convertir la experiencia en algo pesado o distractor.',
      ],
      technicalDecisions: [
        'Landing compacta con foco en marca y navegación muy directa.',
        'Motion medida para reforzar tono sin degradar lectura.',
        'Composición pensada para consulta rápida desde móvil.',
      ],
      deliverables: ['Página de marca', 'Interfaz adaptable', 'Interfaz con movimiento', 'Presencia local'],
      outcomes: [
        'Mejor alineación entre identidad visual y presencia digital de la marca.',
        'Consulta más rápida de información práctica por parte del usuario final.',
      ],
    },
  },
];
