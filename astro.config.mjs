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
  site: 'https://www.nutrizionistaemanuelacasula.it',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    sitemap({
      filter: page => !excludedRoutes.has(new URL(page).pathname),
    }),
  ],
});
