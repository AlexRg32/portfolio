export const LANGS = ['es', 'en'];

export function getLang(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

export function homePath(lang) {
  return lang === 'en' ? '/en' : '/';
}

export function casePrefix(lang) {
  return lang === 'en' ? '/en/work/' : '/trabajo/';
}

export function casePath(lang, slug) {
  return `${casePrefix(lang)}${slug}`;
}

export function privacyPath(lang) {
  return lang === 'en' ? '/en/privacy' : '/privacidad';
}

/** Maps the current URL onto its counterpart in the other language. */
export function otherLanguagePath(pathname) {
  if (getLang(pathname) === 'en') {
    if (pathname.startsWith('/en/work/')) return pathname.replace('/en/work/', '/trabajo/');
    if (pathname === '/en/privacy') return '/privacidad';
    return '/';
  }
  if (pathname.startsWith('/trabajo/')) return pathname.replace('/trabajo/', '/en/work/');
  if (pathname === '/privacidad') return '/en/privacy';
  return '/en';
}

/** Anchor href to a home-page section, valid from any route. */
export function sectionHref(lang, id) {
  return lang === 'en' ? `/en#${id}` : `/#${id}`;
}

/** Home-page section ids, localised so the URL hash reads in the page language. */
export const SECTION_IDS = {
  es: { work: 'trabajo', thesis: 'enfoque', services: 'servicios', process: 'proceso', studio: 'estudio', contact: 'briefing' },
  en: { work: 'work', thesis: 'approach', services: 'services', process: 'process', studio: 'studio', contact: 'briefing' },
};
