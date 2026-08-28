import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const keepAssets = new Set([
  'baluarte-portfolio.jpg',
  'dclick-portfolio.jpg',
  'monica-gallardo-portfolio.jpg',
  'alejandro-portrait.jpg',
  'alejandro-portrait-480.webp',
  'alejandro-portrait-800.webp',
  'alejandro-portrait-1200.webp',
  'alejandro-figure-480.webp',
  'alejandro-figure-760.webp',
  'alejandro-figure-1100.webp',
  'monica-gallardo-portfolio-640.webp',
  'monica-gallardo-portfolio-1200.webp',
  'monica-gallardo-portfolio-1800.webp',
  'monica-gallardo-detail-640.webp',
  'monica-gallardo-detail-1200.webp',
  'monica-gallardo-detail-1800.webp',
  'monica-gallardo-mobile-420.webp',
  'monica-gallardo-mobile-780.webp',
  'dclick-portfolio-640.webp',
  'dclick-portfolio-1200.webp',
  'dclick-portfolio-1800.webp',
  'dclick-detail-640.webp',
  'dclick-detail-1200.webp',
  'dclick-detail-1800.webp',
  'dclick-mobile-420.webp',
  'dclick-mobile-780.webp',
  'baluarte-portfolio-640.webp',
  'baluarte-portfolio-1200.webp',
  'baluarte-portfolio-1800.webp',
  'baluarte-detail-640.webp',
  'baluarte-detail-1200.webp',
  'baluarte-detail-1800.webp',
  'baluarte-mobile-420.webp',
  'baluarte-mobile-780.webp',
  'CV-AlejandroRuiz.pdf',
  'rigby-go-64.webp',
  'grup-mediapro.svg',
  'ar-lattice.svg',
  'grain.png',
]);

const keepFonts = new Set([
  'Archivo-Variable.woff2',
  'IBMPlexMono-Regular.woff2',
  'IBMPlexMono-Medium.woff2',
]);

async function prune(directory, shouldKeep) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() || !shouldKeep(entry.name)) await fs.rm(target, { recursive: true, force: true });
  }));
}

// Anything Vite emitted (hashed js/css chunks) stays; everything else in
// dist/assets has to be an asset we deliberately ship.
const BUILT_CHUNK = /^[\w.-]+-[A-Za-z0-9_-]{8,}\.(?:js|css)$/;

await prune(
  path.join(dist, 'assets'),
  (name) => BUILT_CHUNK.test(name) || keepAssets.has(name),
);
await prune(path.join(dist, 'fonts'), (name) => keepFonts.has(name));
await Promise.all(['favicon.png', '.DS_Store'].map((name) => fs.rm(path.join(dist, name), { force: true })));
