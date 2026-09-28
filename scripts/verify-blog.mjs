import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { getBlogPosts } from './read-blog-fixtures.mjs';

// Isolate fixtures and build output: never alter the real articles or dist.
const root = process.cwd();
const sandbox = mkdtempSync(join(tmpdir(), 'seo-blog-test-'));
try {
  for (const entry of ['src', 'public', 'astro.config.mjs', 'config.mjs', 'package.json', 'tsconfig.json']) cpSync(join(root, entry), join(sandbox, entry), { recursive: true });
  symlinkSync(join(root, 'node_modules'), join(sandbox, 'node_modules'), 'dir');
  const blog = join(sandbox, 'src/data/blog');
  const draft = join(blog, 'draft-fixture');
  mkdirSync(draft);
  writeFileSync(join(draft, 'index.md'), '---\npath: /seo-draft-fixture/\ntitle: Draft fixture\ndraft: true\ncover: ./cover.webp\ncoverAlt: Test cover\n---\nNever publish this fixture.\n');
  const published = join(blog, 'published-fixture');
  mkdirSync(published);
  writeFileSync(join(published, 'index.md'), '---\npath: /seo-published-fixture/\ntitle: Published fixture\ndate: 2020-01-02T12:00:00.000Z\ndateModified: 2024-03-04T12:00:00.000Z\ndescription: Explicit description\ncover: ./cover.webp\ncoverAlt: Test cover\n---\nFixture article.\n');
  for (const dir of [draft, published]) cpSync(join(root, 'src/data/blog/10-01-2021-bodimage/cover.webp'), join(dir, 'cover.webp'));
  const posts = getBlogPosts(blog);
  assert(!posts.some(p => p.id === '/seo-draft-fixture/'));
  const post = posts.find(p => p.id === '/seo-published-fixture/');
  assert.equal(post.description, 'Explicit description');
  assert.equal(post.datePublished, '2020-01-02T12:00:00.000Z');
  assert.equal(post.dateModified, '2024-03-04T12:00:00.000Z');
  const build = () => execFileSync(process.execPath, [join(root, 'node_modules/astro/bin/astro.mjs'), 'build'], { cwd: sandbox, stdio: 'pipe', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
  const read = path => readFileSync(join(sandbox, 'dist', path), 'utf8');
  build();
  assert(!existsSync(join(sandbox, 'dist/seo-draft-fixture/index.html')));
  for (const path of ['Blog/index.html', 'sitemap-0.xml']) assert(!read(path).includes('seo-draft-fixture'));
  const article = read('seo-published-fixture/index.html');
  assert(article.includes('Ultima revisione:'));
  assert(article.includes('2024-03-04T12:00:00.000Z'));
  assert(!article.includes('missing-cover.jpg'));
  const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  build();
  assert.deepEqual(schemas(read('seo-published-fixture/index.html')), schemas(article), 'A rebuild changed editorial dates/schema');
  // With only a draft, listing and sitemap must still build without articles.
  for (const entry of readdirSync(blog)) if (entry !== 'draft-fixture') rmSync(join(blog, entry), { recursive: true });
  assert.deepEqual(getBlogPosts(blog), []);
  // Clear links to deliberately removed articles in this isolated empty fixture.
  for (const entry of readdirSync(join(sandbox, 'src/data/services'))) {
    const path = join(sandbox, 'src/data/services', entry);
    const data = JSON.parse(readFileSync(path, 'utf8')); data.relatedArticles = [];
    writeFileSync(path, JSON.stringify(data));
  }
  rmSync(join(sandbox, 'dist'), { recursive: true });
  build();
  assert(read('Blog/index.html').includes('Non ci sono ancora articoli pubblicati.'));
  assert(!read('sitemap-0.xml').includes('seo-draft-fixture'));
  assert(!existsSync(join(sandbox, 'dist/seo-draft-fixture/index.html')));
  console.log('Blog verificato: bozze escluse, date stabili, revisione esplicita, cover locale e lista vuota.');
} catch (error) {
  if (error.stdout) console.error(error.stdout.toString());
  if (error.stderr) console.error(error.stderr.toString());
  throw error;
} finally {
  rmSync(sandbox, { recursive: true, force: true });
}
