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
- `cover`: obbligatoria, percorso relativo alla cover accanto al Markdown, ad esempio `./cover.webp`; validata con `image()` di Astro e ottimizzata con `<Image />` nelle card.
- `coverAlt`: obbligatorio e descrittivo per fotografie editoriali.
- `coverDecorative: true`: eccezione temporanea per la grafica decorativa esistente di Bodimage e delle bozze, richiede `coverAlt: ""` e conserva la resa del fallback approvato. Per una fotografia dedicata, omettere il flag e scrivere un alt descrittivo.

Ogni cartella in `src/data/blog/` contiene `index.md` e la cover dichiarata. Anche le bozze devono avere file e metadati immagine validi. Non rinominare cartelle/ID o il campo `path` per aggiungere immagini. Non servono mapping globali, MDX o varianti responsive create manualmente. L’immagine social delle pagine articolo resta il ritratto predefinito, separato dalla cover delle card.

Le bozze sono escluse dal sito, ma i loro sorgenti rimangono leggibili se il repository è pubblico. Non inserire certificati, documenti riservati o dati personali nei file versionati.

`npm run verify` controlla tipi, build, metadati, link, schema, sitemap e date. Le prove delle bozze e del blog vuoto eseguono build in una copia temporanea, senza modificare gli articoli reali.

## UI e contenuti professionali

Il presentation layer usa la baseline Spectral del commit `7170fac`; i nuovi contenuti riutilizzano `wrapper`, `spotlight`, `features` e `actions`. Ulteriori modifiche UI/UX richiedono approvazione esplicita preventiva; non cambiare automaticamente palette o layout per ottimizzazioni SEO. Audit e limiti: `docs/ui-rollback-report.md` e `docs/color-harmony-audit.md`.

I dati condivisi sono in `src/data/professional.mjs`; la selezione bibliografica in `src/data/publications.json`. Stato del lavoro e dati ancora mancanti: `docs/seo-release-report.md`. Nessun deploy automatico è stato eseguito.

## Architettura Servizi e Blog

Il menu principale contiene soltanto Home, Chi sono, Servizi, Blog e Contatti. `/servizi/` elenca i percorsi in ordine esplicito. I quattro servizi preparati prima della pubblicazione ora usano `/servizi/<slug>/`; gli URL storici del Blog e delle pagine istituzionali rimangono invariati.

Le Content Collections sono definite in `src/content.config.ts`:

- `services`: file JSON in `src/data/services/`, con titolo, descrizione breve, metadata, intestazione, ordine, draft e riferimenti agli articoli. Il nome del file è lo slug, senza duplicarlo nei dati. Il corpo Astro corrispondente è in `src/components/services/`.
- `blog`: Markdown in `src/data/blog/<id>/index.md`, con le date originali e `relatedServices`. L’ID dei riferimenti è il nome della cartella; `path` conserva l’URL pubblico.

Il caricamento e i riferimenti usano le API native Astro. `draft: true` esclude servizi e articoli da route, elenchi, sitemap e correlati. Riferimenti inesistenti e URL blog duplicati bloccano la build. Quando si elimina un contenuto, aggiornare anche i riferimenti; una bozza esistente può essere referenziata ma non viene mostrata. I collegamenti editoriali nel corpo restano da mantenere consapevolmente.

Header, menu, footer, shell, hub e rendering degli articoli sono componenti Astro statici. I componenti React preesistenti delle altre pagine restano renderizzati sul server, senza idratazione. Nessun router client o nuova dipendenza.

Astro 7.3.0 richiede un alias mirato per `astro/_internal/logger`, referenziato dal modulo assets ma assente dagli export del pacchetto installato. È documentato in `astro.config.mjs`; rivalutarlo in occasione di un futuro aggiornamento esplicitamente autorizzato.

`npm run verify` include fixture temporanee per schema, bozze, contenuti correlati, URL duplicati, date stabili e blog vuoto. Gli script necessari alla verifica sono versionabili; i report locali sotto `docs/` restano ignorati da Git.

## Sitemap e crawling — verifica del 17 ottobre 2026

`@astrojs/sitemap` resta il generatore XML. `integrations/complete-sitemap.mjs` aggiunge un inventario degli HTML reali al termine della build, prima del generatore, e una verifica completa dopo la scrittura. Il dominio viene letto da `config.mjs`, come i canonical delle pagine. Non sono stati modificati slug, contenuti, layout, dipendenze o modalità di deploy.

L'inventario comprende output statico, route da Content Collections e gli eventuali HTML copiati da `public/`. Non usa un elenco di pagine o un limite di età degli articoli. Esclude errori 404/500, meta noindex, meta refresh, canonical verso un URL diverso e HTML senza testo. Gli HTML statici senza canonical usano il proprio URL pubblico; per nuove pagine è comunque consigliato dichiarare un canonical coerente. `/index.html` è rappresentato da `/`, senza cambiare le maiuscole degli URL storici. Query e frammenti non entrano nella sitemap.

`lastmod` deriva esclusivamente da `dateModified` del nodo JSON-LD della pagina, quando presente e valido. Non usa data di build, mtime dei file o Last-Modified HTTP. Omette priority/changefreq e le date non disponibili.

La build fallisce se una pagina indicizzabile manca, se la sitemap contiene un URL non indicizzabile/duplicato/non canonico o se il robots non rispetta la policy aperta. `npm run verify:sitemap` ripete il controllo sulla build corrente, incluse tutte le sitemap figlie. `npm run verify` comprende inoltre fixture di nuove route, articolo storico, servizio e HTML in public, noindex, redirect, canonical esterno, sitemap divisa in più file, duplicati, omissioni e blocchi robots. Il test esistente dei metadata è stato corretto per confrontare l'apostrofo HTML del titolo ISAK con quello dei metadata senza falsi errori. Una seconda build della fixture verifica che la sitemap e le date restino identiche.

Esito attuale: **18 HTML, 14 URL indicizzabili**, di cui **3 articoli + archivio Blog**, **4 servizi + hub**, oltre a home, Chi sono, Contatti, Privacy e Pubblicazioni. Esclusi `/404.html` (errore) e `/Elements/`, `/Generic/`, `/ThankYou/` (noindex). Le tre bozze del blog non generano HTML pubblico. L'articolo ISAK del 17 ottobre e gli articoli storici del 2021/2023 sono inclusi.

Robots pubblicato da `public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://www.nutrizionistaemanuelacasula.it/sitemap-index.xml
```

La policy vale per tutti i crawler conformi al Robots Exclusion Protocol, senza gruppi specifici che possano sovrascriverla. Comprende Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User e PerplexityBot. Ricerca, addestramento e accessi avviati dall'utente hanno finalità diverse: [OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Bing](https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec). [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) è un token di controllo degli usi del contenuto, non un crawler HTTP separato. Non vengono introdotte restrizioni sull'addestramento; non è garantita la visita o l'indicizzazione da parte di alcun bot. Nessun llms.txt aggiunto: non necessario per la scoperta delle pagine HTML già accessibili.

### Controlli di produzione, separati dai test locali

Il 17 ottobre sono stati osservati 301 da HTTP a HTTPS, dal dominio senza www a www mantenendo `/Blog/`, e da `/Blog` a `/Blog/`. `/blog/` restituisce 404: la maiuscola storica va preservata. `/index.html` restituisce 200, ma usa lo stesso HTML della home con canonical `/`; viene incluso soltanto `/` nella sitemap. L'hosting rilevato è GitHub Pages dietro Cloudflare: nessun falso redirect HTML presentato come 301, nessuna regola .htaccess/_redirects non supportata. Per imporre un eventuale 301 aggiuntivo su `/index.html` occorrerebbe una regola sul livello HTTP/CDN, non inclusa in questo intervento locale.

Il robots di produzione risultava già aperto (`Disallow:` vuoto), con l'indice corretto. I test locali non certificano WAF, rate limiting o accesso effettivo dai singoli IP dei crawler. Dopo un futuro deploy, verificare HTTP 200 e contenuto di robots/index/sitemap figlie e inviare l'indice a Search Console/Bing Webmaster Tools. **Nessun deploy eseguito da questo intervento.**
