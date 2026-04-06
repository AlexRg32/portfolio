import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';

export const SITE = {
  name: 'Alejandro Ruiz',
  title: 'Alejandro Ruiz | Full-Stack Developer',
  description:
    'Portfolio profesional de Alejandro Ruiz, full-stack developer con experiencia en React, Laravel, Spring Boot, PHP, PostgreSQL y producto digital.',
  url: 'https://alejandroruiz.netlify.app/',
  image: profile.photo ?? '/assets/profile.jpg',
};

function withLeadingSlash(path) {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function absoluteUrl(path) {
  return new URL(withLeadingSlash(path), SITE.url).toString();
}

export function createMeta({
  title,
  description,
  path = '/',
  image = SITE.image,
  type = 'website',
  schema = null,
  noIndex = false,
}) {
  return {
    title,
    description,
    path: withLeadingSlash(path),
    image,
    type,
    schema,
    noIndex,
  };
}

export function getHomeMeta() {
  return createMeta({
    title: SITE.title,
    description: SITE.description,
    path: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alejandro Ruiz Gasch',
      jobTitle: profile.role,
      url: SITE.url,
      image: absoluteUrl(SITE.image),
      description: profile.recruiterPitch,
      knowsAbout: profile.focusAreas,
      sameAs: [
        'https://github.com/AlexRg32',
        'https://www.linkedin.com/in/alejandro-ruiz-gasch-0230542b3/',
      ],
    },
  });
}

export function getWorkMeta() {
  return createMeta({
    title: 'Trabajo seleccionado | Alejandro Ruiz',
    description:
      'Selección de proyectos de producto, SaaS y frontend que muestran experiencia de Alejandro Ruiz en interfaz, arquitectura web y delivery.',
    path: '/work',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Trabajo seleccionado',
      url: absoluteUrl('/work'),
      hasPart: projects.map((project) => ({
        '@type': 'CreativeWork',
        name: project.title,
        url: absoluteUrl(`/work/${project.id}`),
      })),
    },
  });
}

export function getAboutMeta() {
  return createMeta({
    title: 'Sobre mí | Alejandro Ruiz',
    description:
      'Perfil profesional de Alejandro Ruiz, full-stack developer orientado a producto, frontend claro y sistemas mantenibles.',
    path: '/about',
  });
}

export function getContactMeta() {
  return createMeta({
    title: 'Contacto | Alejandro Ruiz',
    description:
      'Contacta con Alejandro Ruiz para oportunidades profesionales como full-stack developer en equipos de producto.',
    path: '/contact',
  });
}

export function getNotFoundMeta() {
  return createMeta({
    title: 'Página no encontrada | Alejandro Ruiz',
    description:
      'La página que buscas no existe o se ha movido. Puedes volver al inicio, revisar el trabajo seleccionado o contactar conmigo.',
    path: '/404',
    noIndex: true,
  });
}

export function getProjectMeta(project) {
  return createMeta({
    title: `${project.title} | Alejandro Ruiz`,
    description: project.caseStudy.summary,
    path: `/work/${project.id}`,
    image: project.image,
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.caseStudy.summary,
      image: absoluteUrl(project.image),
      url: absoluteUrl(`/work/${project.id}`),
    },
  });
}

export function getPrerenderRoutes() {
  return [
    { path: '/', meta: getHomeMeta() },
    { path: '/work', meta: getWorkMeta() },
    { path: '/about', meta: getAboutMeta() },
    { path: '/contact', meta: getContactMeta() },
    { path: '/404', meta: getNotFoundMeta() },
    ...projects.map((project) => ({
      path: `/work/${project.id}`,
      meta: getProjectMeta(project),
    })),
  ];
}

export function resolveMetaUrls(meta) {
  return {
    ...meta,
    canonicalUrl: absoluteUrl(meta.path),
    imageUrl: absoluteUrl(meta.image),
  };
}
