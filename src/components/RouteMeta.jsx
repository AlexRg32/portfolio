import { useEffect } from 'react';

const ORIGIN = 'https://alexrg.es';

function setMeta(selector, value) {
  document.querySelector(selector)?.setAttribute('content', value);
}

export default function RouteMeta({
  title,
  description,
  path,
  lang = 'es',
  image = '/assets/alejandro-portrait.jpg',
  type = 'website',
  noIndex = false,
}) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;

    const absoluteImage = `${ORIGIN}${image}`;
    const absoluteUrl = `${ORIGIN}${path}`;

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[property="og:url"]', absoluteUrl);
    setMeta('meta[property="og:image"]', absoluteImage);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', absoluteImage);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', absoluteUrl);

    let robots = document.querySelector('meta[name="robots"]');
    if (noIndex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.append(robots);
      }
      robots.setAttribute('content', 'noindex, nofollow');
    } else {
      robots?.remove();
    }
  }, [description, image, lang, noIndex, path, title, type]);

  return null;
}
