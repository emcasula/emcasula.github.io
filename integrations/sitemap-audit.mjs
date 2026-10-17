import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const decode = value => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, code) => {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };
  return code[0] === '#' ? String.fromCodePoint(parseInt(code.slice(code[1].toLowerCase() === 'x' ? 2 : 1), code[1].toLowerCase() === 'x' ? 16 : 10)) : named[code.toLowerCase()];
});
const attrs = tag => Object.fromEntries([...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3] ?? m[4])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`, 'gi'))].map(m => attrs(m[0]));
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
export function canonicalURL(input, site) {
  const url = new URL(input, site);
  if (url.pathname.endsWith('/index.html')) url.pathname = url.pathname.slice(0, -10);
  if (!/\.[^/]+$/.test(url.pathname) && !url.pathname.endsWith('/')) url.pathname += '/';
  return url.href;
}
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value) && Number.isFinite(Date.parse(value));

// Inventory actual output, including public/*.html. No route or collection allowlist.
export function inspectHTML(dir, site) {
  const included = new Map(), excluded = [];
  for (const file of walk(dir).filter(file => /\.html?$/i.test(file))) {
    const path = '/' + relative(dir, file).split(sep).join('/');
    const url = canonicalURL(path, site);
    const html = readFileSync(file, 'utf8');
    const clean = html.replace(/<!--[\s\S]*?-->/g, '');
    const markup = clean.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
    const head = markup.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] ?? markup;
    const meta = tags(head, 'meta');
    const canonicals = tags(head, 'link').filter(tag => tag.rel?.toLowerCase().split(/\s+/).includes('canonical'));
    assert(canonicals.length <= 1, `Canonical multipli: ${path}`);
    const canonical = canonicals[0]?.href;
    const body = markup.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)?.[1] ?? '';
    let reason;
    if (/\/(?:404|500)(?:\.html?|\/index\.html?)$/i.test(path)) reason = 'pagina errore';
    else if (meta.some(m => /^(robots|googlebot|bingbot)$/i.test(m.name ?? '') && /(?:^|[,\s])(noindex|none)(?:$|[,\s])/i.test(m.content ?? ''))) reason = 'noindex';
    else if (meta.some(m => m['http-equiv']?.toLowerCase() === 'refresh')) reason = 'redirect HTML';
    else if (canonical && new URL(canonical, url).href !== url) reason = 'canonical verso altro URL';
    else if (!decode(body.replace(/<[^>]*>/g, ' ')).trim()) reason = 'HTML senza testo';
    if (reason) { excluded.push({ path, reason }); continue; }
    assert.equal(new URL(url).origin, site);
    assert(!new URL(url).search && !new URL(url).hash, `URL non pulito: ${url}`);
    assert(!included.has(url), `HTML canonici duplicati: ${url}`);
    const graph = [...clean.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
      .filter(m => attrs(m[1]).type?.toLowerCase() === 'application/ld+json')
      .flatMap(m => { const data = JSON.parse(m[2]); return data['@graph'] ?? (Array.isArray(data) ? data : [data]); });
    const page = graph.find(node => ['BlogPosting','Article','WebPage'].includes(node['@type']) && node.url === url);
    const lastmod = validDate(page?.dateModified) ? page.dateModified : undefined;
    included.set(url, { url, file, lastmod, article: ['BlogPosting','Article'].includes(page?.['@type']) });
  }
  return { included, excluded };
}

export function readSitemaps(dir, site) {
  const visited = new Set(), entries = [];
  const visit = url => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, site, `Host sitemap non canonico: ${url}`);
    assert(!parsed.search && !parsed.hash);
    assert(!visited.has(url), `Sitemap ripetuta/ciclo: ${url}`); visited.add(url);
    const file = join(dir, decodeURIComponent(parsed.pathname));
    const xml = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const index = /<sitemapindex\b/.test(xml), root = index ? 'sitemapindex' : 'urlset';
    assert(new RegExp(`<${root}\\b[^>]*>[\\s\\S]*</${root}>`).test(xml), `XML non valido: ${url}`);
    const name = index ? 'sitemap' : 'url';
    const blocks = [...xml.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'g'))];
    assert(blocks.length > 0, `Sitemap vuota: ${url}`);
    for (const [,block] of blocks) {
      const locs = [...block.matchAll(/<loc>([^<]+)<\/loc>/g)];
      assert.equal(locs.length, 1, `loc mancante/duplicato: ${url}`);
      const loc = decode(locs[0][1].trim());
      if (index) visit(loc);
      else {
        assert(!/<(?:priority|changefreq)>/.test(block), 'priority/changefreq non previste');
        entries.push({ url: loc, lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] });
      }
    }
  };
  visit(`${site}/sitemap-index.xml`);
  return entries;
}
export function verifySitemap(dir, site) {
  const inventory = inspectHTML(dir, site), entries = readSitemaps(dir, site), found = new Set();
  for (const entry of entries) {
    const url = new URL(entry.url);
    assert.equal(url.origin, site, `Host/protocollo errato: ${entry.url}`);
    assert(!url.search && !url.hash, `Parametri/frammento in sitemap: ${entry.url}`);
    assert.equal(canonicalURL(entry.url, site), entry.url, `Forma non canonica: ${entry.url}`);
    assert(!found.has(entry.url), `URL duplicato: ${entry.url}`); found.add(entry.url);
    const page = inventory.included.get(entry.url);
    assert(page, `URL non indicizzabile o senza HTML: ${entry.url}`);
    assert.equal(entry.lastmod ? Date.parse(entry.lastmod) : undefined, page.lastmod ? Date.parse(page.lastmod) : undefined, `lastmod non editoriale: ${entry.url}`);
  }
  for (const url of inventory.included.keys()) assert(found.has(url), `Pagina indicizzabile assente dalla sitemap: ${url}`);
  // This site's intentionally open policy applies to search, training and user-fetch bots.
  // Fail closed if a future change introduces specific groups or crawl restrictions.
  const lines = readFileSync(join(dir, 'robots.txt'), 'utf8').split(/\r?\n/).map(line => line.replace(/#.*/, '').trim()).filter(Boolean);
  assert.deepEqual(lines.map(line => line.toLowerCase()), ['user-agent: *', 'allow: /', `sitemap: ${site}/sitemap-index.xml`], 'robots.txt non corrisponde alla policy pubblica aperta');
  return { total: found.size, articles: [...inventory.included.values()].filter(p => p.article).length,
    blogPages: [...found].filter(url => url === `${site}/Blog/`).length,
    services: [...found].filter(url => new URL(url).pathname.startsWith('/servizi/')).length,
    excluded: inventory.excluded };
}
