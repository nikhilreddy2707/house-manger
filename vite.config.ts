import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Project layout:
//   app/index.html  -> Vite entry template (used by npm run dev and npm run build)
//   index.html      -> ready-to-open standalone build (created by npm run build:standalone)
// This small plugin keeps the template in app/ but outputs it as index.html.
function moveEntryToRoot(): Plugin {
  return {
    name: 'move-entry-to-root',
    enforce: 'post',
    // Dev server: serve app/index.html when the browser asks for "/"
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/' || req.url === '/index.html') req.url = '/app/index.html';
        next();
      });
    },
    // Build: write app/index.html as index.html in the output folder
    generateBundle(_options, bundle) {
      const entry = bundle['app/index.html'];
      if (entry) {
        delete bundle['app/index.html'];
        entry.fileName = 'index.html';
        bundle['index.html'] = entry;
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone';
  return {
    // standalone: one self-contained file, written to the project root
    // normal:     regular build in dist/ (used by Netlify)
    base: standalone ? './' : '/',
    plugins: [react(), moveEntryToRoot(), ...(standalone ? [viteSingleFile()] : [])],
    build: {
      outDir: standalone ? '.' : 'dist',
      emptyOutDir: !standalone,
      rollupOptions: { input: 'app/index.html' },
    },
    server: { port: 5173, host: true },
  };
});
