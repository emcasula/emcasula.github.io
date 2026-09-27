import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getBlogPosts } from '../src/lib/blog.mjs';
import config from '../config.mjs';
import { professional, services } from '../src/data/professional.mjs';

const output = join(process.cwd(), 'dist');
const pages = ['index.html', '404.html', ...['Blog', 'ChiSono', 'Contatti', 'Elements', 'Generic', 'Privacy', 'ThankYou'].map(p => `${p}/index.html`), ...[...services.map(s => s.href), '/prima-visita-nutrizionista-cagliari/', '/pubblicazioni-scientifiche/'].map(p => `${p.replace(/^\/+|\/+$/g, '')}/index.html`), ...getBlogPosts().map(p => `${p.frontmatter.path.replace(/^\/+|\/+$/g, '')}/index.html`)];
const read = file => readFileSync(join(output, file), 'utf8');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(m => attrs(m[0]));
const titles = new Set(), descriptions = new Set();
for (const file of [...pages, 'CNAME', 'manifest.webmanifest', 'robots.txt', 'sitemap-0.xml', 'sitemap-index.xml', 'sw.js']) assert(existsSync(join(output, file)), `File mancante: ${file}`);
for (const file of pages) {
  const html = read(file);
  const path = file === 'index.html' ? '/' : `/${file.replace(/index\.html$/, '')}`;
  const expectedUrl = new URL(path, config.url).href;
  const meta = tags(html, 'meta');
  const value = key => meta.find(m => m.name === key || m.property === key)?.content;
  const canonical = tags(html, 'link').filter(l => l.rel === 'canonical');
  assert.equal(canonical.length, 1, file);
  assert.equal(canonical[0].href, expectedUrl, file);
  assert.equal(value('og:url'), expectedUrl, file);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `H1: ${file}`);
  assert(html.includes('<html lang="it">'), file);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Title duplicato/vuoto: ${file}`); titles.add(title);
  const description = value('description');
  assert(description && !descriptions.has(description), `Description duplicata/vuota: ${file}`); descriptions.add(description);
  assert.equal(value('og:title'), title, file);
  assert.equal(value('og:description'), description, file);
  const image = new URL(value('og:image'));
  assert.equal(image.origin, config.url);
  assert(existsSync(join(output, image.pathname)), `Immagine OG: ${file}`);
  assert(tags(html, 'link').some(l => l.rel === 'icon'), file);
  assert(!html.includes('[object Object]'), file);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
    const target = match[1];
    assert(existsSync(join(output, target)), `Link/asset mancante in ${file}: ${target}`);
  }
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  assert.equal(blocks.length, 1, file);
  const graph = blocks[0]['@graph'];
  assert(graph.some(n => n['@id'] === `${config.url}/#person`), file);
  const page = graph.find(n => ['WebPage', 'BlogPosting'].includes(n['@type']));
  assert.equal(page.url, expectedUrl, file);
  assert.equal(page.description, description.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"'), file);
  assert(!JSON.stringify(graph).includes('hhttps:'), file);
  const business = graph.find(n => n['@type'] === 'MedicalBusiness');
  assert.equal(business.address.streetAddress, professional.address.street);
  assert.equal(business.telephone, professional.phone);
  assert(html.includes(professional.address.street), `NAP non visibile: ${file}`);
  assert(!graph.some(n => n.geo || n.priceRange || n.aggregateRating || n.hasCredential), file);
  const ids = tags(html, '[a-zA-Z0-9]+').map(a => a.id).filter(Boolean);
  if (!file.startsWith('Elements/')) assert.equal(new Set(ids).size, ids.length, `ID HTML duplicati: ${file}`);
  assert(!/TODO|PLACEHOLDER/.test(html), `Placeholder pubblico: ${file}`);
  const breadcrumb = graph.find(n => n['@type'] === 'BreadcrumbList');
  if (path !== '/') {
    assert.equal(breadcrumb.itemListElement.at(-1).item, expectedUrl, file);
    assert(html.includes('aria-label="Percorso di navigazione"'), file);
  }
  const post = getBlogPosts().find(p => p.frontmatter.path.replace(/\/$/, '') === path.replace(/\/$/, ''));
  if (post) {
    assert.equal(page['@type'], 'BlogPosting');
    assert.equal(page.datePublished, post.datePublished);
    assert.equal(page.dateModified, post.dateModified);
    assert(html.toLowerCase().includes(`datetime="${post.datePublished.toLowerCase()}"`));
  } else {
    assert(!('dateModified' in page) && !('datePublished' in page), file);
  }
  if (['404.html', 'Elements/index.html', 'Generic/index.html', 'ThankYou/index.html'].includes(file)) assert.equal(value('robots'), 'noindex', file);
}
const sitemap = read('sitemap-0.xml');
assert(read('robots.txt').includes(`${config.url}/sitemap-index.xml`));
assert(read('sitemap-index.xml').includes(`${config.url}/sitemap-0.xml`));
for (const excluded of ['/404', '/Elements/', '/Generic/', '/ThankYou/']) assert(!sitemap.includes(excluded));
for (const loc of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) assert.equal(new URL(loc[1]).origin, config.url);
console.log(`SEO verificata: ${pages.length} pagine, metadati, link, schema, date e sitemap.`);

for (const slug of ['certificazione-isak-antropometria', 'bia-antropometria-peso', 'ricomposizione-corporea-peso']) {
  assert(!existsSync(join(output, slug)), `Bozza pubblicata: ${slug}`);
  assert(!sitemap.includes(slug));
  assert(!read('Blog/index.html').includes(`/${slug}/`));
}
const home = read('index.html');
for (const service of services) assert(home.includes(service.href));
assert(home.includes('srcSet=') || home.includes('srcset='));
assert(!home.includes('Disponibilità limitata'));
assert(read('pubblicazioni-scientifiche/index.html').includes('35745166'));
