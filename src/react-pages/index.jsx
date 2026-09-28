import React from 'react';

import Scroll from '../components/Scroll';

import pic3 from '../assets/images/pic03-1200.webp';
import pic3_small from '../assets/images/pic03-480.webp';
import bodybuilders from '../assets/images/body-builders-1200.webp';
import bodybuilders_small from '../assets/images/body-builders-480.webp';
import bodybuilders_stanchi from '../assets/images/body-builders-stanchi-1200.webp';
import bodybuilders_stanchi_small from '../assets/images/body-builders-stanchi-480.webp';
import emanuela_casula from '../assets/images/nutrizionista-emanuela-casula-2-1200.webp';
import emanuela_casula_small from '../assets/images/nutrizionista-emanuela-casula-2-480.webp';
import config from '../../config.mjs';
import ContactMe from '../components/SEO/Contactme';

const IndexPage = () => {

  return (
    <>
      <main id="main-content">
      <section id="banner">
        <div className="inner">
          <h1>{config.heading}</h1>
          <p>{config.subHeading}</p>
          <p>Nutrizione sportiva, benessere e ricomposizione corporea</p>
          <ul className="actions special">
            <li>
              <Scroll type="id" element="cta">
                <a href="#cta" className="button primary">
                  Prenota ora
                </a>
              </Scroll>
            </li>
          </ul>
        </div>
        <Scroll type="id" element="one">
          <a href="#one" className="more">
            Scopri di più
          </a>
        </Scroll>
      </section>

      <section id="one" className="wrapper style1 special">
        <div className="inner">
          <header className="major">
            <h2>
              Nutrizione sportiva basata sulle evidenze scientifiche
            </h2>
            <p>
              Accompagno sportivi e persone comuni in un percorso nutrizionale senza diete rigide ma con un metodo sostenibile costruito <strong>su di te</strong>.
            </p>
            <p>
              Preparo percorsi nutrizionali <strong>personalizzati</strong> per chi vuole migliorare salute, composizione corporea e performance, dal paziente sedentario allo sportivo amatoriale.
            </p>
          </header>
        </div>
      </section>

      <section id="per-te" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>
              Questo percorso è per te se
            </h2>
            <p>
              Vuoi migliorare la tua forma fisica
            </p>
            <p>
              Ti alleni ma non vedi risultati
            </p>
            <p>
              Vuoi aumentare la massa muscolare e/o migliorare la performance
            </p>
            <p>
              Hai provato diete che non sei riuscito a mantenere
            </p>
            <p>
              Vuoi sentirti meglio nel tuo corpo e nel tuo rapporto con il cibo
            </p>
          </header>
        </div>
      </section>

      <section id="one-1" className="wrapper style2 special">
        <div className="inner">
          <header className="major">
            <h2>
              <a href="/ChiSono/">Chi sono</a>
            </h2>
            <p>
              Sono la dott.ssa Emanuela Casula, biologa nutrizionista. Mi occupo di aiutare le persone a migliorare la propria alimentazione <strong>in modo sostenibile</strong> con un'attenzione particolare alla <strong><a href="/servizi/nutrizione-sportiva-cagliari/">nutrizione sportiva</a></strong> e alla <strong><a href="/servizi/ricomposizione-corporea-cagliari/">ricomposizione corporea</a></strong>.
              <br />
              Nel mio lavoro unisco <strong>approccio scientifico e ascolto empatico</strong>, perché ogni percorso deve essere <strong>efficace</strong> ma anche <strong>realistico</strong> nella vita quotidiana.
            </p>
          </header>
        </div>
      </section>

      <section id="two" className="wrapper alt style2">
        <section className="spotlight">
          <div className="image">
            <img src={emanuela_casula.src} srcSet={`${emanuela_casula_small.src} ${emanuela_casula_small.width}w, ${emanuela_casula.src} ${emanuela_casula.width}w`} sizes="(max-width: 736px) 100vw, 45vw" width={emanuela_casula.width} height={emanuela_casula.height} loading="lazy" decoding="async" alt="Emanuela Casula, Biologa Nutrizionista" />
          </div>
          <div className="content">
            <h2>
              Formazione ed esperienza
            </h2>
            <p>
              Mi sono laureata in Scienze degli Alimenti e della Nutrizione e ho conseguito un <strong>Dottorato di ricerca (PhD)</strong> in Medicina Molecolare e Traslazionale, sviluppando un approccio basato sull’<a href="/pubblicazioni-scientifiche/">evidenza scientifica</a> e sulla comprensione dei meccanismi cellulari.
            </p>
            <p>
              Negli anni ho approfondito la nutrizione sportiva partecipando a corsi di formazione e convegni dedicati, per rimanere aggiornata sulle strategie più efficaci per migliorare performance, recupero e composizione corporea.
            </p>
            <p>
              Successivamente, ho conseguito la certificazione come personal trainer, acquisendo una visione pratica dell'allenamento e delle esigenze di chi pratica sport.          </p>
            <p>
              Da anni lavoro con sportivi amatoriali, accompagnando percorsi di ricomposizione corporea, perdita di peso e miglioramento della forma fisica.
            </p>
            <p>
              Questo mi permette di lavorare con un approccio completo che integra alimentazione, allenamento e performance nella vita reale.
            </p>
          </div>
        </section>
        <section className="spotlight">
          <div className="image">
            <img src={bodybuilders_stanchi.src} srcSet={`${bodybuilders_stanchi_small.src} ${bodybuilders_stanchi_small.width}w, ${bodybuilders_stanchi.src} ${bodybuilders_stanchi.width}w`} sizes="(max-width: 736px) 100vw, 45vw" width={bodybuilders_stanchi.width} height={bodybuilders_stanchi.height} loading="lazy" decoding="async" alt="" />
          </div>
          <div className="content">
            <h2>
              Il vero problema
            </h2>
            <div>
              Molte persone pensano che basti “mangiare sano”.
              <br />
              In realtà, quando ti alleni, il tuo corpo ha <strong>esigenze specifiche.</strong>
              <br />
              <br />
              Senza una strategia nutrizionale adeguata:
              <br />
              <ul>
                <li>
                  l’energia cala
                </li>
                <li>
                  il recupero rallenta
                </li>
                <li>
                  i risultati faticano ad arrivare
                </li>
              </ul>
              Il punto non è solo cosa mangi, ma come alimentazione, metabolismo e allenamento lavorano insieme.
            </div>
          </div>
        </section>

        <section className="spotlight">
          <div className="image">
            <img src={pic3.src} srcSet={`${pic3_small.src} ${pic3_small.width}w, ${pic3.src} ${pic3.width}w`} sizes="(max-width: 736px) 100vw, 45vw" width={pic3.width} height={pic3.height} loading="lazy" decoding="async" alt="" />
          </div>
          <div className="content">
            <h2>
              Percorso nutrizionale personalizzato
            </h2>
            <div>
              Non una dieta standard ma un piano costruito su abitudini, obiettivi e stile di vita da adattare e monitorare nel tempo.
              <br />
              <br />
              <p>
                <strong>Se fai sport</strong>, potrai avere un percorso per migliorare le performance, aumentare la massa muscolare e/o ridurre la massa grassa senza compromettere energie e allenamenti attraverso un piano che supporta allenamento, recupero e risultati nel tempo.
              </p>
              <p>
                <strong>Se non fai sport</strong>, potrai avere un percorso per migliorare energia, equilibrio e rapporto con il cibo.
              </p>
            </div>
          </div>
        </section>


        <section className="spotlight">
          <div className="image">
            <img src={bodybuilders.src} srcSet={`${bodybuilders_small.src} ${bodybuilders_small.width}w, ${bodybuilders.src} ${bodybuilders.width}w`} sizes="(max-width: 736px) 100vw, 45vw" width={bodybuilders.width} height={bodybuilders.height} loading="lazy" decoding="async" alt="" />
          </div>
          <div className="content">
            <h2>
              Obiettivi del percorso
            </h2>
            <div>
              Il percorso può lavorare su:
              <br />
              <br />
              <ul>
                <li>
                  più energia e un recupero più rapido negli allenamenti
                </li>
                <li>
                  miglior composizione corporea
                </li>
                <li>
                  performance più stabili nel tempo
                </li>
                <li>
                  maggiore consapevolezza alimentare
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>

      <section id="three" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>Il Metodo</h2>
          </header>
          <ul className="features">
            <li className="icon solid fa-clipboard-list full-width">
              <h3>Come lavoreremo insieme</h3>
              <strong>1. Analisi Completa</strong><br />
              Alimentazione, stile di vita e allenamento<br />
              <br />
              <strong>2. Piano personalizzato</strong><br />Costruito su misura per i tuoi obiettivi<br />
              <br />
              <strong>3. Monitoraggio</strong><br />Valutazione dei progressi<br />
              <br />
              <strong>4. Adattamento continuo</strong><br />Il piano evolve con te<br />
              <br />
            </li>
          </ul>
          <ul className="features">
            <li className="icon solid fa-not-equal full-width">
              <h3>Perché questo approccio è diverso</h3>
              <strong>Non lavoro con schemi standard.</strong><br /><br />
              Integro:<br />
              - Approccio basato sulle evidenze scientifiche<br />
              - Esperienza nell'allenamento<br />
              - Aggiornamento continuo<br />
              <br />
              Non ti do una dieta.<br />
              <strong>Ti do una strategia costruita sul tuo corpo e sul tuo obiettivo.</strong><br />
            </li>
          </ul>
          <Scroll type="id" element="cta">
            <a href="#cta" className="button primary">
              Prenota ora
            </a>
          </Scroll>
        </div>
      </section>

      <section id="servizi" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>Come posso aiutarti</h2>
          </header>
          <ul className="features">
            <li className="icon solid fa-weight full-width">
              <h3><a href="/servizi/prima-visita-nutrizionista-cagliari/">Visita nutrizionale completa</a></h3>
              <p>
                Anamnesi iniziale, analisi della composizione corporea e valutazione dello stato nutrizionale, piano nutrizionale <strong>personalizzato</strong>, tarato sui tuoi obiettivi.<br />
                Per soggetti in condizioni fisiologiche o patologiche accertate e per sportivi.<br />
                Seguiranno periodiche visite di controllo per monitorare i tuoi progressi.
              </p>
            </li>
          </ul>
          <ul className="features">
            <li className="icon solid fa-dumbbell full-width">
              <h3>E se fai sport</h3>
              In base al tuo obiettivo:<br />
              - Costruisci massa in modo efficace.
              <br />
              - Perdi grasso mantenendo la performance.
              <br />
              - Ottimizza energia, resistenza e recupero.
              <br />
              - Impara cosa mangiare prima, durante e dopo l’attività fisica.
              <br />
              <br />
              Ogni percorso è <strong>completamente personalizzato su di te</strong>, il tuo sport e i <strong>tuoi obiettivi</strong>.
            </li>
          </ul>
          <ul className="features">
            <li className="icon solid fa-child">
              <h3><a href="/servizi/valutazione-composizione-corporea-cagliari/">Valutazione composizione corporea</a></h3>
              <p>
                Valutazione della massa magra e di quella grassa, del BMI (per stabilire lo stato di normopeso, sovrappeso, obesità). Misura delle circonferenze corporee.
              </p>
            </li>
            <li className="icon solid fa-dumbbell">
              <h3>Consulenze nutrizionali per palestre</h3>
              <p>
                Possibilità di collaborazioni con palestre e centri sportivi.
              </p>
            </li>
            <li className="icon solid fa-user-graduate">
              <h3>Corsi</h3>
              <p>
                Corsi di formazione nell'ambito della nutrizione degli alimenti e della biologia.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section id="conclusione" className="wrapper style2 special">
        <div className="inner">
          <header className="major">
            <p>
              So quanto può essere frustrante impegnarsi e non vedere risultati.<br />
              Il mio obiettivo è aiutarti a ottenere ciò per cui stai lavorando, con un metodo chiaro, <strong>sostenibile</strong> e basato sulla scienza.            </p>
          </header>
        </div>
      </section>

      <section id="cta" className="wrapper style4">
        <div className="inner">
          <header>
            <h2>Prenota la tua consulenza</h2>
          </header>
        </div>

					<div className="inner">
          <ContactMe />
        </div>
      </section>

      </main>
    </>)
}

export default IndexPage;
