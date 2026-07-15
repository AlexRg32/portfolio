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
  'CV-AlejandroRuiz.pdf',
  'rigby-go.png',
  'grup-mediapro.svg',
]);

const keepFonts = new Set([
  'Archivo-Variable.woff2',
  'IBMPlexMono-Regular.woff2',
]);

async function prune(directory, shouldKeep) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() || !shouldKeep(entry.name)) await fs.rm(target, { recursive: true, force: true });
  }));
}

await prune(path.join(dist, 'assets'), (name) => name.startsWith('index-') || keepAssets.has(name));
await prune(path.join(dist, 'fonts'), (name) => keepFonts.has(name));
