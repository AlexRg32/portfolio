import { useEffect } from 'react';

const origin = 'https://alexrg.es';

export default function RouteMeta({ title, description, path, lang = 'es', image = '/assets/alejandro-portrait.jpg' }) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    const values = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:image"]': `${origin}${image}`,
      'meta[property="og:url"]': `${origin}${path}`,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
      'meta[name="twitter:image"]': `${origin}${image}`,
    };
    Object.entries(values).forEach(([selector, value]) => {
      document.querySelector(selector)?.setAttribute('content', value);
    });
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${origin}${path}`);
    window.scrollTo(0, 0);
  }, [description, image, lang, path, title]);
  return null;
}
