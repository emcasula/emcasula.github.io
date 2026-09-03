import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'dist');
const expectedPages = [
  'index.html',
  '404.html',
  'Blog/index.html',
  'ChiSono/index.html',
  'Contatti/index.html',
  'Elements/index.html',
  'Generic/index.html',
  'Privacy/index.html',
  'ThankYou/index.html',
  'bodimage-per-visite-nutrizionali-online-cosa-e/index.html',
  'ipertrofia-muscolare/index.html',
];
const expectedFiles = [
  ...expectedPages,
  'CNAME',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap-0.xml',
  'sitemap-index.xml',
  'sw.js',
];

const missingFiles = expectedFiles.filter(file => !existsSync(join(outputDirectory, file)));
if (missingFiles.length) {
  throw new Error(`File di build mancanti: ${missingFiles.join(', ')}`);
}

const htmlByPage = new Map(
  expectedPages.map(file => [file, readFileSync(join(outputDirectory, file), 'utf8')]),
);

for (const [file, html] of htmlByPage) {
  if (html.includes('[object Object]')) {
    throw new Error(`URL asset non risolto in ${file}`);
  }
  if (!html.includes('<html lang="it">')) {
    throw new Error(`Lingua HTML mancante in ${file}`);
  }
  if (!html.includes('Biologa Nutrizionista a Cagliari, anche online.')) {
    throw new Error(`Meta description mancante in ${file}`);
  }

  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)["?#]/g)) {
    const publicPath = match[1];
    if (publicPath === '/') continue;
    if (/^\/(?:Blog|ChiSono|Contatti|Elements|Generic|Privacy|ThankYou)$/.test(publicPath)) {
      throw new Error(`Slash finale mancante nel link interno di ${file}: ${publicPath}`);
    }
    if (!existsSync(join(outputDirectory, publicPath))) {
      throw new Error(`Asset interno non risolto in ${file}: ${publicPath}`);
    }
  }
}

const defaultTitle = '<title>Nutrizionista Emanuela Casula Cagliari</title>';
if (!htmlByPage.get('index.html').includes(defaultTitle)) {
  throw new Error('Title predefinito non preservato');
}
if (!htmlByPage.get('ThankYou/index.html').includes('<meta name="robots" content="noindex">')) {
  throw new Error('Direttiva noindex mancante su ThankYou');
}
if (!htmlByPage.get('ipertrofia-muscolare/index.html').includes(
  '<title>Ipertrofia Muscolare, scopriamola | Nutrizionista Emanuela Casula</title>',
)) {
  throw new Error('Title articolo non preservato');
}

const sitemap = readFileSync(join(outputDirectory, 'sitemap-0.xml'), 'utf8');
for (const excluded of ['/404/', '/Elements/', '/Generic/', '/ThankYou/']) {
  if (sitemap.includes(excluded)) {
    throw new Error(`Route esclusa presente nella sitemap: ${excluded}`);
  }
}

console.log(`Verifica completata: ${expectedPages.length} pagine e asset statici validati.`);
