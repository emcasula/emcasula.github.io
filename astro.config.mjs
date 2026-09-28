import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const excludedRoutes = new Set([
  '/404/',
  '/Elements/',
  '/Generic/',
  '/ThankYou/',
]);

export default defineConfig({
  // Astro 7.3.0 references this internal logger without exporting it.
  // Narrow compatibility alias; remove once the installed release exports it.
  vite: { resolve: { alias: { 'astro/_internal/logger': fileURLToPath(new URL('./node_modules/astro/dist/core/logger/core.js', import.meta.url)) } } },
  site: 'https://www.nutrizionistaemanuelacasula.it',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    sitemap({
      filter: page => !excludedRoutes.has(new URL(page).pathname),
    }),
  ],
});
