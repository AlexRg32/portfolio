import { projects } from '../data/content.js';

export const SITE = {
  name: 'Alejandro Ruiz',
  url: 'https://alexrg.es/',
  image: '/assets/alejandro-portrait.jpg',
};

const descriptions = {
  es: 'Portfolio de Alejandro Ruiz, frontend developer en Alicante.',
  en: 'Alejandro Ruiz is a frontend developer based in Alicante.',
};

function withLeadingSlash(value) {
  if (!value) return '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function absoluteUrl(value) {
  return new URL(withLeadingSlash(value), SITE.url).toString();
}

function createMeta({ title, description, path = '/', image = SITE.image, type = 'website', schema = null, noIndex = false, lang = 'es' }) {
  return { title, description, path: withLeadingSlash(path), image, type, schema, noIndex, lang };
}

function personSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alejandro Ruiz Gasch',
    jobTitle: 'Frontend Developer',
    url: SITE.url,
    description: descriptions[lang],
    sameAs: ['https://github.com/AlexRg32', 'https://www.linkedin.com/in/alejandro-ruiz-gasch-0230542b3/'],
  };
}

function projectMeta(project, lang) {
  const prefix = lang === 'es' ? '/trabajo/' : '/en/work/';
  return createMeta({
    title: `${project.title} — Alejandro Ruiz`,
    description: project.summary[lang],
    path: `${prefix}${project.slug}`,
    image: project.image,
    type: 'article',
    lang,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary[lang],
      image: absoluteUrl(project.image),
      url: absoluteUrl(`${prefix}${project.slug}`),
      creator: { '@type': 'Person', name: 'Alejandro Ruiz Gasch' },
    },
  });
}

export function getPrerenderRoutes() {
  const base = [
    createMeta({ title: 'Alejandro Ruiz — Frontend developer', description: descriptions.es, path: '/', schema: personSchema('es') }),
    createMeta({ title: 'Alejandro Ruiz — Frontend developer', description: descriptions.en, path: '/en', lang: 'en', schema: personSchema('en') }),
    createMeta({ title: 'Privacidad — Alejandro Ruiz', description: 'Información sobre privacidad y tratamiento de datos en alexrg.es.', path: '/privacidad' }),
    createMeta({ title: 'Privacy — Alejandro Ruiz', description: 'Privacy and data processing information for alexrg.es.', path: '/en/privacy', lang: 'en' }),
    createMeta({ title: '404 — Alejandro Ruiz', description: 'Página no encontrada.', path: '/404', noIndex: true }),
  ];

  return [
    ...base.map((meta) => ({ path: meta.path, meta })),
    ...projects.flatMap((project) => ['es', 'en'].map((lang) => {
      const meta = projectMeta(project, lang);
      return { path: meta.path, meta };
    })),
  ];
}

export function resolveMetaUrls(meta) {
  return { ...meta, canonicalUrl: absoluteUrl(meta.path), imageUrl: absoluteUrl(meta.image) };
}
