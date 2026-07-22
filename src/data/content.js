export const projects = [
  {
    slug: 'monica-gallardo',
    title: 'Mónica Gallardo Estilistas',
    year: '2026',
    category: { es: 'Web de marca', en: 'Brand website' },
    summary: {
      es: 'Una web cálida y directa para peluquería, estética y novias.',
      en: 'A warm, direct website for hair, beauty and bridal services.',
    },
    services: { es: 'Dirección visual · UX/UI · Desarrollo', en: 'Art direction · UX/UI · Development' },
    image: '/assets/monica-gallardo-portfolio.jpg',
    imageAlt: { es: 'Captura de la web de Mónica Gallardo Estilistas', en: 'Mónica Gallardo Estilistas website screenshot' },
    url: 'https://monica-gallardo-estilistas-crevillent.netlify.app',
    challenge: {
      es: 'Presentar más de treinta años de experiencia con una imagen actual y una reserva de cita fácil.',
      en: 'Present over thirty years of experience with a current image and simple appointment booking.',
    },
    response: {
      es: 'La web combina una jerarquía editorial, fotografía protagonista y accesos claros a servicios, novias y contacto.',
      en: 'The website combines editorial hierarchy, strong photography and clear access to services, bridal and contact.',
    },
    decisions: {
      es: ['Tipografía editorial para dar personalidad.', 'Reserva de cita visible desde el primer bloque.', 'Paleta cálida alineada con el salón.'],
      en: ['Editorial typography for a distinct personality.', 'Appointment booking visible from the first section.', 'A warm palette aligned with the salon.'],
    },
    next: 'dclick',
  },
  {
    slug: 'dclick',
    title: "Autoescuela D’Click",
    year: '2026',
    category: { es: 'Landing de conversión', en: 'Conversion landing page' },
    summary: {
      es: 'Una landing que convierte una oferta amplia en decisiones sencillas.',
      en: 'A landing page that turns a broad offer into simple decisions.',
    },
    services: { es: 'Estrategia · UX/UI · Desarrollo', en: 'Strategy · UX/UI · Development' },
    image: '/assets/dclick-portfolio.jpg',
    imageAlt: { es: 'Captura de la web de Autoescuela D’Click', en: 'Autoescuela D’Click website screenshot' },
    url: 'https://autoescuela-dclick.netlify.app',
    challenge: {
      es: 'Explicar cursos, ubicaciones y vías de contacto a perfiles distintos sin saturar la página.',
      en: 'Explain courses, locations and contact options to different audiences without overwhelming the page.',
    },
    response: {
      es: 'Diseñé una jerarquía mobile-first basada en preguntas reales: qué puedo estudiar, dónde y cómo empiezo. Cada bloque reduce una decisión y devuelve al usuario a una acción clara.',
      en: 'I designed a mobile-first hierarchy around real questions: what can I study, where and how do I start? Each section resolves one decision and returns the user to a clear action.',
    },
    decisions: {
      es: ['Contenido escaneable y CTA persistentes en los puntos de decisión.', 'Sistema modular para cursos y distintas sedes.', 'Motion ligero que acompaña la jerarquía sin competir con ella.'],
      en: ['Scannable content and CTAs at key decision points.', 'A modular system for courses and multiple locations.', 'Light motion that supports the hierarchy without competing with it.'],
    },
    next: 'baluarte',
  },
  {
    slug: 'baluarte',
    title: 'Espectáculos Baluarte',
    year: '2026',
    category: { es: 'Web expositiva', en: 'Showcase website' },
    summary: {
      es: 'Escala, ritmo y una navegación clara para un catálogo visual de espectáculos.',
      en: 'Scale, rhythm and clear navigation for a highly visual show catalogue.',
    },
    services: { es: 'Dirección visual · UX/UI · Desarrollo', en: 'Art direction · UX/UI · Development' },
    image: '/assets/baluarte-portfolio.jpg',
    imageAlt: { es: 'Captura de la web de Espectáculos Baluarte', en: 'Espectáculos Baluarte website screenshot' },
    url: 'https://espectaculosbaluarte.netlify.app',
    challenge: {
      es: 'Mostrar una oferta extensa y espectacular sin convertir la experiencia en un catálogo caótico o pesado.',
      en: 'Present a broad, spectacular offer without turning the experience into a chaotic or heavy catalogue.',
    },
    response: {
      es: 'Organicé el contenido como un recorrido editorial. Las imágenes marcan el ritmo, mientras una jerarquía estable permite entender cada familia de espectáculos y moverse sin esfuerzo.',
      en: 'I organised the content as an editorial journey. Images set the pace while a stable hierarchy makes every show category easy to understand and navigate.',
    },
    decisions: {
      es: ['Bloques de gran formato para comunicar escala.', 'Jerarquía repetible para ordenar un catálogo heterogéneo.', 'Carga progresiva de medios para mantener una experiencia ágil.'],
      en: ['Large-format sections to communicate scale.', 'A repeatable hierarchy for a varied catalogue.', 'Progressive media loading to keep the experience fast.'],
    },
    next: 'monica-gallardo',
  },
];

export const content = {
  es: {
    metaDescription: 'Portfolio de Alejandro Ruiz, frontend developer en Alicante.',
    nav: { work: 'Proyectos', experience: 'Experiencia', about: 'Perfil', contact: 'Contacto', menu: 'Abrir menú', close: 'Cerrar menú' },
    hero: { eyebrow: 'Frontend developer — Alicante', title: ['Soy Alejandro, frontend developer.'], intro: 'Hago webs claras, rápidas y fáciles de usar.', primary: 'Proyectos', secondary: 'Contacto', imageAlt: 'Alejandro Ruiz junto a un lago', caption: 'Alejandro Ruiz' },
    work: { eyebrow: 'Proyectos', title: 'Trabajo seleccionado.', intro: 'Diseño y desarrollo, de inicio a fin.', readCase: 'Ver proyecto', open: 'Abrir' },
    experience: { eyebrow: 'Experiencia', title: 'Ahora y antes.', skillsLabel: 'Tecnologías y capacidades', items: [
      { company: 'Polo Club', logo: '/assets/rigby-go.png', logoClass: 'experience-logo--rigby', role: 'IT Support & Development', period: '2026 — AHORA', description: 'E-commerce y herramientas internas.' },
      { company: 'Infoexpo', role: 'Full-Stack Developer', period: '2025 — 2026', description: 'Producto SaaS B2B.' },
      { company: 'Grup Mediapro', logo: '/assets/grup-mediapro.svg', logoClass: 'experience-logo--mediapro', role: 'Field Operator', period: '2023 — AHORA', description: 'Operativa audiovisual.' },
    ]},
    about: { eyebrow: 'Perfil', title: 'Simple, útil, bien hecho.', body: 'Soy Alejandro. Frontend developer con experiencia en producto, e-commerce y desarrollo full-stack.', meta: 'React · JavaScript · Laravel · Odoo · Shopify' },
    contact: { eyebrow: 'Contacto', title: '¿Hablamos?', body: 'Disponible para proyectos y equipos de producto.' },
  },
  en: {
    metaDescription: 'Alejandro Ruiz is a frontend developer based in Alicante.',
    nav: { work: 'Projects', experience: 'Experience', about: 'Profile', contact: 'Contact', menu: 'Open menu', close: 'Close menu' },
    hero: { eyebrow: 'Frontend developer — Alicante', title: ['I’m Alejandro, a frontend developer.'], intro: 'I make websites clear, fast and easy to use.', primary: 'Projects', secondary: 'Contact', imageAlt: 'Alejandro Ruiz by a lake', caption: 'Alejandro Ruiz' },
    work: { eyebrow: 'Projects', title: 'Selected work.', intro: 'Design and development, end to end.', readCase: 'View project', open: 'Open' },
    experience: { eyebrow: 'Experience', title: 'Now and before.', skillsLabel: 'Technologies and capabilities', items: [
      { company: 'Polo Club', logo: '/assets/rigby-go.png', logoClass: 'experience-logo--rigby', role: 'IT Support & Development', period: '2026 — NOW', description: 'E-commerce and internal tools.' },
      { company: 'Infoexpo', role: 'Full-Stack Developer', period: '2025 — 2026', description: 'B2B SaaS product.' },
      { company: 'Grup Mediapro', logo: '/assets/grup-mediapro.svg', logoClass: 'experience-logo--mediapro', role: 'Field Operator', period: '2023 — NOW', description: 'Broadcast operations.' },
    ]},
    about: { eyebrow: 'Profile', title: 'Simple, useful, well made.', body: 'I’m Alejandro. Frontend developer with experience in product, e-commerce and full-stack development.', meta: 'React · JavaScript · Laravel · Odoo · Shopify' },
    contact: { eyebrow: 'Contact', title: 'Let’s talk.', body: 'Available for projects and product teams.' },
  },
};
