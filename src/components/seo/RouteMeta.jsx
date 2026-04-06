import { useEffect } from 'react';
import { resolveMetaUrls } from '../../utils/routeMeta';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function removeNode(selector) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.remove();
  }
}

export default function RouteMeta({ meta }) {
  useEffect(() => {
    if (!meta) return undefined;

    const resolvedMeta = resolveMetaUrls(meta);
    const { title, description, type, canonicalUrl, imageUrl, schema, noIndex } = resolvedMeta;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    if (noIndex) {
      upsertMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, nofollow' });
    } else {
      removeNode('meta[name="robots"]');
    }

    document.head
      .querySelectorAll('script[data-route-schema="true"]')
      .forEach((element) => element.remove());

    if (schema) {
      const schemaTag = document.createElement('script');
      schemaTag.type = 'application/ld+json';
      schemaTag.dataset.routeSchema = 'true';
      schemaTag.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaTag);
    }

    return undefined;
  }, [meta]);

  return null;
}
