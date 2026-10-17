import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { inspectHTML, verifySitemap } from './sitemap-audit.mjs';

// Hooks run in integration order. The official generator still writes/splits XML.
export default function completeSitemap(site) {
  let inventory;
  const options = {
    customPages: [],
    filter: url => inventory.included.has(url),
    serialize: item => ({ ...item, lastmod: inventory.included.get(item.url)?.lastmod }),
  };
  return [
    { name: 'sitemap-html-inventory', hooks: {
      'astro:build:done': ({ dir }) => {
        inventory = inspectHTML(fileURLToPath(dir), site);
        options.customPages = [...inventory.included.keys()];
      },
    } },
    sitemap(options),
    { name: 'sitemap-completeness-check', hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const result = verifySitemap(fileURLToPath(dir), site);
        logger.info(`${result.total} URL canonici verificati; ${result.articles} articoli, ${result.services} pagine servizi (hub incluso).`);
      },
    } },
  ];
}
