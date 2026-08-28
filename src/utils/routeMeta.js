import { projects, content, LINKEDIN_URL, GITHUB_URL } from '../data/content.js';

export const SITE = {
  name: 'Alejandro Ruiz',
  url: 'https://alexrg.es/',
  image: '/assets/alejandro-portrait.jpg',
};

function withLeadingSlash(value) {
  if (!value) return '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function absoluteUrl(value) {
  return new URL(withLeadingSlash(value), SITE.url).toString();
}

function createMeta({
  title,
  description,
  path = '/',
  image = SITE.image,
  type = 'website',
  schema = null,
  noIndex = false,
  lang = 'es',
  preloadImage = false,
}) {
  return { title, description, path: withLeadingSlash(path), image, type, schema, noIndex, lang, preloadImage };
}

/**
 * Person, not Organization. Alejandro works alone; describing the site as a
 * company in structured data would be a claim that is not true.
 */
function personSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alejandro Ruiz Gasch',
    alternateName: 'Alejandro Ruiz',
    jobTitle: lang === 'es' ? 'Diseñador y desarrollador web' : 'Web designer and developer',
    url: SITE.url,
    image: absoluteUrl(SITE.image),
    description: content[lang].metaDescription,
    address: { '@type': 'PostalAddress', addressLocality: 'Alicante', addressCountry: 'ES' },
    knowsAbout: ['UX/UI', 'Art direction', 'Frontend development', 'React', 'Laravel', 'Odoo', 'Shopify'],
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

function projectMeta(project, lang) {
  const prefix = lang === 'es' ? '/trabajo/' : '/en/work/';
  const text = project[lang];
  return createMeta({
    title: `${project.title} — ${text.category} · Alejandro Ruiz`,
    description: text.summary,
    path: `${prefix}${project.slug}`,
    image: project.image,
    type: 'article',
    lang,
    preloadImage: true,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: text.summary,
      about: text.sector,
      image: absoluteUrl(project.image),
      url: absoluteUrl(`${prefix}${project.slug}`),
      dateCreated: project.year,
      creator: { '@type': 'Person', name: 'Alejandro Ruiz Gasch', url: SITE.url },
    },
  });
}

export function getPrerenderRoutes() {
  const base = [
    createMeta({
      title: content.es.metaTitle,
      description: content.es.metaDescription,
      path: '/',
      schema: personSchema('es'),
      preloadImage: true,
    }),
    createMeta({
      title: content.en.metaTitle,
      description: content.en.metaDescription,
      path: '/en',
      lang: 'en',
      schema: personSchema('en'),
      preloadImage: true,
    }),
    createMeta({
      title: 'Privacidad — Alejandro Ruiz',
      description: 'Cómo se tratan los datos que envías a través de alexrg.es.',
      path: '/privacidad',
    }),
    createMeta({
      title: 'Privacy — Alejandro Ruiz',
      description: 'How the data you send through alexrg.es is handled.',
      path: '/en/privacy',
      lang: 'en',
    }),
    createMeta({
      title: '404 — Alejandro Ruiz',
      description: 'Página no encontrada.',
      path: '/404',
      noIndex: true,
    }),
  ];

  return [
    ...base.map((meta) => ({ path: meta.path, meta })),
    ...projects.flatMap((project) =>
      ['es', 'en'].map((lang) => {
        const meta = projectMeta(project, lang);
        return { path: meta.path, meta };
      }),
    ),
  ];
}

export function resolveMetaUrls(meta) {
  return { ...meta, canonicalUrl: absoluteUrl(meta.path), imageUrl: absoluteUrl(meta.image) };
}
