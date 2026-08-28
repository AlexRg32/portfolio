import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * `vite preview` falls back to index.html for extensionless paths, which hides
 * the prerendered per-route HTML. Netlify serves `<route>/index.html` at
 * `/route`, so this makes the local preview behave the same way and keeps QA
 * honest about what visitors actually receive.
 */
function servePrerenderedRoutes() {
  return {
    name: 'serve-prerendered-routes',
    apply: 'serve',
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const [pathname] = (req.url ?? '/').split('?');
        if (pathname === '/' || path.extname(pathname)) return next();
        const file = path.join(outDir, pathname, 'index.html');
        if (file.startsWith(outDir) && fs.existsSync(file)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(fs.readFileSync(file));
          return undefined;
        }
        // Unknown route: mirror netlify.toml and serve the 404 document.
        const notFound = path.join(outDir, '404.html');
        if (!fs.existsSync(notFound)) return next();
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(notFound));
        return undefined;
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), servePrerenderedRoutes()],
});
