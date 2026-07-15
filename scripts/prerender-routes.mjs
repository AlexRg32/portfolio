import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPrerenderRoutes, resolveMetaUrls } from '../src/utils/routeMeta.js';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_INDEX = path.join(DIST_DIR, 'index.html');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Expected pattern not found while prerendering: ${pattern}`);
  }

  return html.replace(pattern, replacement);
}

function injectHeadContent(html, content) {
  return html.replace('</head>', `${content}\n  </head>`);
}

function renderHtml(template, metaInput) {
  const meta = resolveMetaUrls(metaInput);
  let html = template;

  html = html.replace('<html lang="es">', `<html lang="${meta.lang ?? 'es'}">`);

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:type" content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${escapeHtml(meta.type)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:image" content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeHtml(meta.imageUrl)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:image" content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeHtml(meta.imageUrl)}" />`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />`
  );

  html = html.replace(/\n\s*<meta name="robots" content="[^"]*"\s*\/>/g, '');
  html = html.replace(/\n\s*<script type="application\/ld\+json" data-route-schema="true">[\s\S]*?<\/script>/g, '');

  if (meta.noIndex) {
    html = injectHeadContent(
      html,
      `  <meta name="robots" content="noindex, nofollow" />`
    );
  }

  if (meta.schema) {
    html = injectHeadContent(
      html,
      `  <script type="application/ld+json" data-route-schema="true">${JSON.stringify(meta.schema)}</script>`
    );
  }

  return html;
}

async function writeRouteHtml(routePath, html) {
  if (routePath === '/') {
    await fs.writeFile(DIST_INDEX, html);
    return;
  }

  if (routePath === '/404') {
    await fs.writeFile(path.join(DIST_DIR, '404.html'), html);
    return;
  }

  const outputDir = path.join(DIST_DIR, routePath.slice(1));
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, 'index.html'), html);
}

async function main() {
  const template = await fs.readFile(DIST_INDEX, 'utf8');
  const routes = getPrerenderRoutes();

  await Promise.all(
    routes.map(({ path: routePath, meta }) => writeRouteHtml(routePath, renderHtml(template, meta)))
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
