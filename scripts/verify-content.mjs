import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
const root = process.cwd();
const sandbox = mkdtempSync(join(tmpdir(), 'astro-content-test-'));
try {
  for (const name of ['src','public','astro.config.mjs','config.mjs','package.json','tsconfig.json']) cpSync(join(root,name),join(sandbox,name),{recursive:true});
  symlinkSync(join(root,'node_modules'),join(sandbox,'node_modules'),'dir');
  const serviceFile = join(sandbox,'src/data/services/nutrizione-sportiva-cagliari.json');
  const service = JSON.parse(readFileSync(serviceFile,'utf8'));
  const draftFile = join(sandbox,'src/data/services/fixture-draft.json');
  writeFileSync(draftFile,JSON.stringify({...service,title:'Servizio bozza fixture',draft:true}));
  const postDir = join(sandbox,'src/data/blog/relation-fixture'); mkdirSync(postDir);
  const postFile = join(postDir,'index.md');
  writeFileSync(postFile,'---\npath: /relation-fixture/\ntitle: Relazione bozza\ndate: 2020-01-01\nrelatedServices: [fixture-draft]\ncover: ./cover.webp\ncoverAlt: Test cover\n---\nTest.');
  const draftPostDir = join(sandbox,'src/data/blog/related-draft'); mkdirSync(draftPostDir);
  writeFileSync(join(draftPostDir,'index.md'),'---\npath: /related-draft/\ntitle: Articolo bozza fixture\ndraft: true\ncover: ./cover.webp\ncoverAlt: Test cover\n---\nTest.');
  for (const dir of [postDir, draftPostDir]) cpSync(join(root,'src/data/blog/10-01-2021-bodimage/cover.webp'),join(dir,'cover.webp'));
  writeFileSync(serviceFile,JSON.stringify({...service,relatedArticles:['related-draft']}));
  const build = () => {
    rmSync(join(sandbox,'dist'),{recursive:true,force:true});
    rmSync(join(sandbox,'.astro'),{recursive:true,force:true});
    return execFileSync(process.execPath,[join(root,'node_modules/astro/bin/astro.mjs'),'build'],{cwd:sandbox,stdio:'pipe'});
  };
  build();
  const read = path => readFileSync(join(sandbox,'dist',path),'utf8');
  assert(!existsSync(join(sandbox,'dist/servizi/fixture-draft/index.html')));
  for (const file of ['servizi/index.html','sitemap-0.xml','relation-fixture/index.html']) assert(!read(file).includes('/servizi/fixture-draft/'));
  for (const file of ['Blog/index.html','sitemap-0.xml','servizi/nutrizione-sportiva-cagliari/index.html']) assert(!read(file).includes('/related-draft/'));
  const expectFailure = pattern => {
    let error; try {build();} catch(e) {error=e;}
    assert(error,'Build accepted invalid content');
    assert.match(`${error.stdout}\n${error.stderr}`,pattern);
  };
  const originalPost = readFileSync(postFile, 'utf8');
  for (const [invalid, pattern] of [
    [originalPost.replace('cover: ./cover.webp\n', ''), /cover/],
    [originalPost.replace('./cover.webp', './missing-cover.webp'), /missing-cover/],
    [originalPost.replace('coverAlt: Test cover\n', ''), /coverAlt/],
    [originalPost.replace('coverAlt: Test cover', 'coverAlt: ""'), /coverAlt/],
  ]) {
    writeFileSync(postFile, invalid);
    expectFailure(pattern);
  }
  writeFileSync(postFile, originalPost);
  const {title,...withoutTitle} = service;
  writeFileSync(serviceFile,JSON.stringify(withoutTitle));
  expectFailure(/title/);
  writeFileSync(serviceFile,JSON.stringify({...service,relatedArticles:['non-existent']}));
  expectFailure(/non-existent/);
  writeFileSync(serviceFile,JSON.stringify(service));
  const duplicate = join(sandbox,'src/data/blog/duplicate-fixture'); mkdirSync(duplicate);
  cpSync(postFile,join(duplicate,'index.md'));
  cpSync(join(postDir,'cover.webp'),join(duplicate,'cover.webp'));
  expectFailure(/URL blog duplicato/);
  console.log('Content Collections: draft servizi/articoli esclusi anche dai correlati; schema, riferimenti e URL duplicati verificati.');
} finally { rmSync(sandbox,{recursive:true,force:true}); }
