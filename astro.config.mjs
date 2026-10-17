import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import completeSitemap from './integrations/complete-sitemap.mjs';
import config from './config.mjs';

export default defineConfig({
  // Astro 7.3.0 references this internal logger without exporting it.
  // Narrow compatibility alias; remove once the installed release exports it.
  vite: { resolve: { alias: { 'astro/_internal/logger': fileURLToPath(new URL('./node_modules/astro/dist/core/logger/core.js', import.meta.url)) } } },
  site: config.url,
  trailingSlash: 'ignore',
  integrations: [
    react(),
    ...completeSitemap(config.url),
  ],
});
