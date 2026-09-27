# Nutrizionista Emanuela Casula

Sito statico realizzato con Astro e componenti React, basato sul design Spectral di HTML5 UP.

## Requisiti

- Node.js compatibile con la versione di Astro dichiarata in `package.json`
- npm

## Sviluppo

```sh
npm install
npm run dev
```

Il server locale indica nel terminale l'URL da aprire.

## Verifica e build

```sh
npm run verify
npm run preview
```

La build statica viene generata in `dist/`.

## Deploy

```sh
npm run deploy
```

Il comando genera la build Astro e pubblica `dist/` tramite GitHub Pages.

## Struttura

- `src/pages/`: route Astro
- `src/react-pages/`: markup delle pagine mantenuto in React
- `src/layouts/`: shell HTML e metadati condivisi
- `src/data/blog/`: articoli Markdown
- `src/assets/`: Sass, immagini e webfont
- `public/`: asset statici copiati senza trasformazioni

## Metadati e articoli

Ogni route passa title e description specifici a `PageShell`. Canonical, URL social e schema usano il dominio pubblico con `www`. Le pagine dimostrative restano `noindex` e fuori dalla sitemap.

Il frontmatter degli articoli supporta:

- `draft: true`: esclude l’articolo dalla build, dal blog e dalla sitemap; omesso o `false` pubblica l’articolo.
- `description`: descrizione editoriale facoltativa; in assenza viene usato l’excerpt.
- `date`: data originale di pubblicazione, obbligatoria per gli articoli pubblicati.
- `dateModified`: data ISO facoltativa di una revisione sostanziale; non aggiornarla per una semplice build.
- `cover`: percorso assoluto di un file in `public/`; se manca o non esiste viene usato il ritratto predefinito.

Le bozze sono escluse dal sito, ma i loro sorgenti rimangono leggibili se il repository è pubblico. Non inserire certificati, documenti riservati o dati personali nei file versionati.

`npm run verify` controlla tipi, build, metadati, link, schema, sitemap e date. Le prove delle bozze e del blog vuoto eseguono build in una copia temporanea, senza modificare gli articoli reali.

## UI e contenuti professionali

Il presentation layer usa la baseline Spectral del commit `7170fac`; i nuovi contenuti riutilizzano `wrapper`, `spotlight`, `features` e `actions`. Ulteriori modifiche UI/UX richiedono approvazione esplicita preventiva; non cambiare automaticamente palette o layout per ottimizzazioni SEO. Audit e limiti: `docs/ui-rollback-report.md` e `docs/color-harmony-audit.md`.

I dati condivisi sono in `src/data/professional.mjs`; la selezione bibliografica in `src/data/publications.json`. Stato del lavoro e dati ancora mancanti: `docs/seo-release-report.md`. Nessun deploy automatico è stato eseguito.
