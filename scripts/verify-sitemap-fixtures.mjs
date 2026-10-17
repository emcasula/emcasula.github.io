import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import config from '../config.mjs';
import { verifySitemap, readSitemaps } from '../integrations/sitemap-audit.mjs';
const root = process.cwd(), dir = mkdtempSync(join(tmpdir(), 'sitemap-fixture-'));
const site = config.url;
try {
  for (const name of ['src','public','integrations','astro.config.mjs','config.mjs','package.json','tsconfig.json']) cpSync(join(root,name),join(dir,name),{recursive:true});
  symlinkSync(join(root,'node_modules'),join(dir,'node_modules'),'dir');
  const page = head => `<!doctype html><html><head>${head}</head><body><h1>Testo pubblico fixture</h1></body></html>`;
  for (const [name,head] of Object.entries({
    'public-text.html': '',
    'noindex.html': "<meta content='NOINDEX, follow' name='ROBOTS'>",
    'redirect.html': '<meta http-equiv="refresh" content="0;url=/">',
    'alias.html': `<link href='${site}/' rel='canonical'>`,
    'external.html': '<link rel="canonical" href="https://example.com/">',
    'tracking.html': `<link rel="canonical" href='${site}/tracking.html?utm_source=test'>`,
    '500.html': '',
  })) writeFileSync(join(dir,'public',name), page(head));
  writeFileSync(join(dir,'public','empty.html'), '<html><body><script>fake text</script></body></html>');
  writeFileSync(join(dir,'src/pages/future-page.astro'),page(`<link rel="canonical" href="${site}/future-page/">`));
  writeFileSync(join(dir,'src/pages/future-noindex.astro'),page('<meta name="robots" content="noindex">'));
  // Prove new collection entries are discovered, without changing config or sitemap tests.
  const service = JSON.parse(readFileSync(join(dir,'src/data/services/nutrizione-sportiva-cagliari.json'),'utf8'));
  writeFileSync(join(dir,'src/data/services/future-service.json'),JSON.stringify({...service,order:10,relatedArticles:[]}));
  writeFileSync(join(dir,'src/components/services/future-service.astro'),'<p>Nuovo servizio di prova.</p>');
  const post = join(dir,'src/data/blog/future-post'); mkdirSync(post);
  cpSync(join(dir,'src/data/blog/10-01-2021-bodimage/cover.webp'),join(post,'cover.webp'));
  writeFileSync(join(post,'index.md'),'---\npath: /future-post/\ntitle: Articolo storico fixture\ndate: 1999-01-02T00:00:00Z\ndateModified: 2001-02-03T00:00:00Z\ncover: ./cover.webp\ncoverAlt: Copertina fixture\n---\nTesto articolo.');
  execFileSync(process.execPath,[join(root,'node_modules/astro/bin/astro.mjs'),'build'],{cwd:dir,stdio:'pipe'});
  const dist = join(dir,'dist'), child = join(dist,'sitemap-0.xml');
  const xml = readFileSync(child,'utf8');
  const entries = readSitemaps(dist,site);
  for (const path of ['/future-page/','/future-post/','/servizi/future-service/','/public-text.html']) assert(entries.some(e=>e.url===site+path));
  assert.equal(Date.parse(entries.find(e=>e.url===site+'/future-post/').lastmod),Date.parse('2001-02-03T00:00:00Z'));
  assert.equal(entries.find(e=>e.url===site+'/future-page/').lastmod,undefined);
  for (const path of ['/future-noindex/','/noindex.html','/redirect.html','/alias.html','/external.html','/tracking.html','/500.html','/empty.html']) assert(!entries.some(e=>e.url===site+path));
  verifySitemap(dist,site);
  const blocks = [...xml.matchAll(/<url>.*?<\/url>/gs)].map(m=>m[0]);
  const blogBlock = blocks.find(b=>b.includes('/future-post/'));
  const serviceBlock = blocks.find(b=>b.includes('/servizi/future-service/'));
  for (const block of [blogBlock,serviceBlock]) {
    writeFileSync(child,xml.replace(block,'')); assert.throws(()=>verifySitemap(dist,site),/assente dalla sitemap/);
  }
  writeFileSync(child,xml.replace('</urlset>',blogBlock+'</urlset>'));
  assert.throws(()=>verifySitemap(dist,site),/duplicato/);
  writeFileSync(child,xml.replace(blogBlock,blogBlock.replace('https://www.','http://www.')));
  assert.throws(()=>verifySitemap(dist,site),/Host\/protocollo/);
  writeFileSync(child,xml.replace('</urlset>',`<url><loc>${site}/noindex.html</loc></url></urlset>`));
  assert.throws(()=>verifySitemap(dist,site),/non indicizzabile/);
  // Verify all child sitemaps, not only sitemap-0.xml.
  const rootOpen = xml.slice(0,xml.indexOf('<url>'));
  writeFileSync(child,rootOpen+blocks.slice(0,2).join('')+'</urlset>');
  writeFileSync(join(dist,'sitemap-1.xml'),rootOpen+blocks.slice(2).join('')+'</urlset>');
  writeFileSync(join(dist,'sitemap-index.xml'),`<?xml version="1.0"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${site}/sitemap-0.xml</loc></sitemap><sitemap><loc>${site}/sitemap-1.xml</loc></sitemap></sitemapindex>`);
  verifySitemap(dist,site);
  writeFileSync(join(dist,'robots.txt'),'User-agent: *\nDisallow: /\n');
  assert.throws(()=>verifySitemap(dist,site),/robots.txt/);
  console.log('Sitemap fixture: nuove route, servizi, articoli storici e public HTML; esclusioni, sitemap figlie, URL mancanti/duplicati e robots verificati.');
} catch(error) {
  if(error.stdout) console.error(error.stdout.toString());
  if(error.stderr) console.error(error.stderr.toString());
  throw error;
} finally { rmSync(dir,{recursive:true,force:true}); }
