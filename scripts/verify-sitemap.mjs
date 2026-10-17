import { resolve } from 'node:path';
import config from '../config.mjs';
import { verifySitemap } from '../integrations/sitemap-audit.mjs';
console.log(JSON.stringify(verifySitemap(resolve(process.argv[2] ?? 'dist'), config.url), null, 2));
