# Gatsby to Astro migration report

## Summary

Il sito è stato migrato da Gatsby 5 ad Astro 7 mantenendo route, contenuti, struttura DOM, classi CSS, Sass, immagini, webfont, metadati e integrazioni esterne. Le pagine presentazionali sono ancora componenti React renderizzati staticamente da Astro: questa scelta riduce le modifiche al markup e il rischio di regressioni. Gatsby e i relativi plugin non sono più dipendenze del progetto.

Il lavoro è stato eseguito esclusivamente sul branch `astro`.

## Previous architecture

- Gatsby 5.7 e React 18.
- Pagine React in `src/pages`.
- Layout globale React con `StaticQuery` e `react-helmet`.
- Sass globale importato dal layout.
- Articoli Markdown caricati tramite `gatsby-source-filesystem` e `gatsby-transformer-remark`.
- Due pagine articolo create da `gatsby-node.js` con `createPages`.
- Sitemap, manifest e supporto offline forniti da plugin Gatsby.
- Build statica pubblicata su GitHub Pages tramite `gh-pages` e directory `public`.

## New architecture

- Astro 7.3.0 con output statico. I link canonici mantengono lo slash finale, mentre il router accetta entrambe le forme per compatibilità con URL o cache precedenti.
- Route in `src/pages/*.astro`.
- Markup preesistente conservato nei componenti `src/react-pages/*.jsx` e renderizzato lato build tramite `@astrojs/react`, senza hydration delle pagine.
- Shell HTML, SEO, JSON-LD e script globali in `src/layouts/PageShell.astro`.
- Articoli Markdown letti direttamente dal filesystem in `src/lib/blog.mjs`.
- Route articoli generate con `getStaticPaths()`.
- Sass globale originale mantenuto e aggiornato alla sintassi a moduli supportata dalle versioni correnti di Dart Sass.
- Build in `dist/` e deploy GitHub Pages tramite `gh-pages`.

## Migration decisions

- Il markup delle pagine è rimasto React per preservare il DOM prodotto dal progetto precedente.
- Menu, rimozione della classe `is-preload` e smooth scrolling sono inizializzati con script browser globali minimi. Non viene idratata l'intera pagina React e non vengono aggiunti wrapper `astro-island` al DOM.
- Il data layer Gatsby/GraphQL non è stato replicato: i due file Markdown vengono letti e renderizzati direttamente.
- Le immagini originali restano in `src/assets`; Astro ne emette copie fingerprinted senza trasformazioni intenzionali di crop, dimensioni o qualità.
- I valori SEO legacy, inclusi gli eventuali valori anomali già presenti, sono stati conservati invece di essere corretti.
- Su richiesta successiva, tutte le dipendenze sono state aggiornate alle release `latest`. TypeScript è fissato alla 6.0.3, ultima versione compatibile: la 7.0.2 non espone ancora l'API programmatica richiesta da `astro check`.

## Gatsby -> Astro mapping

| Gatsby mechanism | Current use | Astro replacement | Risk |
| --- | --- | --- | --- |
| `src/pages/*.js` | Pagine statiche | `src/pages/*.astro` con componenti React SSR | Low |
| `gatsby-node createPages` | Due route blog | `[slug].astro` + `getStaticPaths()` | Medium |
| Gatsby GraphQL page query | Listing e dettaglio blog | Lettura filesystem + gray-matter + markdown-it | Medium |
| `StaticQuery` / `useStaticQuery` | Metadata sito | Import diretto da `config.mjs` | Low |
| Gatsby `Link` | Link interni | Elementi `<a>` equivalenti | Low |
| `react-helmet` | Head e JSON-LD | `PageShell.astro` | Medium |
| `gatsby-plugin-sass` | Sass globale | Supporto Sass nativo Astro/Vite | Low |
| `gatsby-plugin-sitemap` | Sitemap | `@astrojs/sitemap` | Low |
| `gatsby-plugin-manifest` | Web manifest | Endpoint statico `manifest.webmanifest` | Low |
| `gatsby-plugin-offline` | Service worker | Service worker statico | Medium |
| `gatsby-plugin-catch-links` | Navigazione interna | Navigazione HTML nativa | Low |
| Gatsby Image/Sharp plugins | Installati ma non usati nei componenti | Import asset Vite/Astro | Low |

## Routes

| Gatsby URL | Astro URL | Status |
| --- | --- | --- |
| `/` | `/` | IDENTICAL |
| `/Blog/` | `/Blog/` | IDENTICAL |
| `/ChiSono/` | `/ChiSono/` | IDENTICAL |
| `/Contatti/` | `/Contatti/` | IDENTICAL |
| `/Elements/` | `/Elements/` | IDENTICAL |
| `/Generic/` | `/Generic/` | IDENTICAL |
| `/Privacy/` | `/Privacy/` | IDENTICAL |
| `/ThankYou/` | `/ThankYou/` | IDENTICAL |
| `/404.html` | `/404.html` | IDENTICAL |
| `/bodimage-per-visite-nutrizionali-online-cosa-e/` | `/bodimage-per-visite-nutrizionali-online-cosa-e/` | IDENTICAL |
| `/ipertrofia-muscolare/` | `/ipertrofia-muscolare/` | IDENTICAL |

La sitemap continua a escludere `ThankYou`, `404`, `Generic` ed `Elements`.

## Data layer

I dati arrivano esclusivamente da `config.mjs` e dai file locali `src/data/blog/*/index.md`. `gray-matter` legge il frontmatter, `markdown-it` produce l'HTML e una funzione locale replica ordinamento, formato data italiano ed excerpt del listing.

## GraphQL removed

- `SiteTitleQuery`: il valore era letto ma non usato; eliminata senza sostituzione runtime.
- Query `SEO`: sostituita dall'import diretto di `config.mjs` e dalla data di build.
- `IndexQuery` del blog: sostituita da `getBlogPosts()`.
- `BlogPostByPath`: sostituita dai props prodotti da `getStaticPaths()`.
- Query di `gatsby-node`: sostituita dall'enumerazione dei file Markdown.

## React components retained

Sono mantenuti il layout, header/navigation, footer, blocco contatti, pagine e template articolo. Sono presentazionali e vengono renderizzati staticamente; conservarli evita una riscrittura estesa di markup e classi.

## Components converted to Astro

- `PageShell.astro`: documento HTML, metadata, JSON-LD e inizializzazione browser.
- I file route Astro sono wrapper sottili e non cambiano il markup visuale delle pagine.

## Gatsby plugins

| Gatsby plugin | Purpose | Used? | Astro replacement | Action |
| --- | --- | --- | --- | --- |
| `gatsby-plugin-react-helmet` | Metadata | Yes | Head Astro | REPLACE |
| `gatsby-plugin-catch-links` | Link interni | Yes | Navigazione HTML | NOT NEEDED IN ASTRO |
| `gatsby-plugin-sitemap` | Sitemap | Yes | `@astrojs/sitemap` | REPLACE |
| `gatsby-source-filesystem` | Blog locale | Yes | Node filesystem | REPLACE |
| `gatsby-transformer-remark` | Markdown | Yes | `gray-matter` + `markdown-it` | REPLACE |
| `gatsby-remark-images` | Immagini Markdown | No effective use | Nessuno | NOT NEEDED IN ASTRO |
| `gatsby-plugin-manifest` | Manifest | Yes | Endpoint statico | CUSTOM IMPLEMENTATION |
| `gatsby-plugin-sass` | Sass | Yes | Sass nativo Astro/Vite | NOT NEEDED IN ASTRO |
| `gatsby-plugin-offline` | Offline/PWA | Yes | Service worker statico | CUSTOM IMPLEMENTATION |
| `gatsby-plugin-sharp` | Processing immagini | No direct use | Asset pipeline Astro | NOT NEEDED IN ASTRO |

## Images

I file originali non sono stati sostituiti o ricompressi manualmente. Gli import React usano l'URL `src` prodotto dalla pipeline Astro. Alt text, ordine, classi e contenitori sono invariati.

## SEO

Sono preservati title, description, lingua HTML, Open Graph, robots `noindex` per `ThankYou`, JSON-LD business/webpage/article, breadcrumb, sitemap, robots.txt e manifest. Non sono stati aggiunti canonical o Twitter metadata perché non erano presenti nella baseline.

## Analytics and integrations

Non erano presenti provider analytics o tracking nel repository. Sono preservati i link e gli attributi dell'integrazione MioDottore, WhatsApp, Facebook, Instagram, email e telefono. Non sono stati modificati ID o provider.

## Visual parity

- Font Awesome, Google Font, breakpoint e asset sorgente sono invariati. Il Sass è stato modernizzato senza modificare il CSS compilato: il confronto SHA-256 prima/dopo è identico (`5f3810e3d56320b796f5b40a9f91e05a7a77a83956987081f044e7070f9f80e8`).
- Il markup delle pagine e le classi sono stati conservati nei componenti React.
- La build viene controllata per route mancanti, asset non risolti, metadata principali, sitemap e immagini.
- La build Gatsby di riferimento non ha potuto essere generata perché il `node_modules` iniziale conteneva un file `create-gatsby` troncato. Il problema esisteva prima delle modifiche e ha impedito un diff screenshot automatizzato Gatsby/Astro locale.

## Known differences

- Gli URL fingerprinted degli asset cambiano perché sono prodotti dalla pipeline Astro anziché da Gatsby; i file sorgente e la resa prevista restano gli stessi.
- Il service worker è una sostituzione statica del precedente Workbox generato da Gatsby. Usa la rete come prima scelta per le navigazioni e la cache come fallback; l'implementazione interna non è identica.
- Non è disponibile un confronto screenshot automatizzato contro una build Gatsby locale per la corruzione preesistente descritta sopra.

## Post-migration improvements

- Le deprecazioni Sass (`@import`, funzioni globali, vecchio `if()` e argomenti senza unità) sono state eliminate usando il module system e le API correnti. La build non emette più questi avvisi e il CSS compilato è byte-per-byte identico alla versione precedente alla correzione.
- Il documento originale contiene markup HTML non valido, per esempio elementi block annidati in `<p>` e ID duplicati. È stato mantenuto intenzionalmente.
- Alcuni valori SEO legacy sembrano errati o puntano ad asset non presenti; sono stati mantenuti per parità e possono essere corretti in un'attività separata.

## Environment variables

Il progetto non utilizza variabili ambiente e non richiede secret.

## Build

```sh
npm install
npm run check
npm run build
npm run verify
```

La build statica viene scritta in `dist/`.

## Deployment

Il provider resta GitHub Pages. `npm run deploy` esegue una nuova build e pubblica `dist/` con `gh-pages`. Il file `CNAME` viene copiato nella root della build.
