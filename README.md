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
npm run check
npm run build
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
