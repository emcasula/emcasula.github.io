import React from 'react';

import Layout from '../components/Layout';
import Scroll from '../components/Scroll';

import pic1 from '../assets/images/pic01.jpg';
import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';
import bodybuilders from '../assets/images/body-builders.png';
import bodybuilders_stanchi from '../assets/images/body-builders-stanchi.png';
import emanuela_casula from '../assets/images/nutrizionista-emanuela-casula-2.png';
import config from '../../config';
import ContactMe from '../components/SEO/Contactme';

const IndexPage = () => {

  return (
    <Layout>
      <section id="banner">
        <div className="inner">
          <h2>{config.heading}</h2>
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
              Nutrizione sportiva basata sulla scienza, per chi vuole risultati reali
            </h2>
            <p>
              Aiuto sportivi e persone comuni a ottenere risultati <strong>concreti</strong> senza diete rigide ma con un metodo sostenibile costruito <strong>su di te</strong>.
            </p>
            <p>
              Preparo percorsi nutrizionali <strong>personalizzati</strong> per chi vuole migliorare salute, composizione corporea e performance, dal paziente sedentario allo sportivo amatoriale.
            </p>
          </header>
        </div>
      </section>

      <section id="one" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>
              Questo percorso è per te se
            </h2>
            <p>
              Vuoi migliorale la tua forma fisica
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
              Chi sono
            </h2>
            <p>
              Sono la dott.ssa Emanuela Casula, biologa nutrizionista. Mi occupo di aiutare le persone a migliorare la propria alimentazione <strong>in modo sostenibile</strong> con un'attenzione particolare alla <strong>nutrizione sportiva</strong> e alla <strong>ricomposizione corporea</strong>.
              <br />
              Nel mio lavoro unisco <strong>approccio scientifico e ascolto empatico</strong>, perchè ogni percorso deve essere <strong>efficace</strong> ma anche <strong>realistico</strong> nella vita quotidiana.
            </p>
          </header>
        </div>
      </section>

      <section id="two" className="wrapper alt style2">
        <section className="spotlight">
          <div className="image">
            <img src={emanuela_casula} alt="" />
          </div>
          <div className="content">
            <h2>
              Formazione ed esperienza
            </h2>
            <p>
              Mi sono laureata in Scienze degli Alimenti e della Nutrizione e ho conseguito un <strong>Dottorato di ricerca (PhD)</strong> in Medicina Molecolare e Traslazionale, sviluppando un approccio basato sull’evidenza scientifica e sulla comprensione dei meccanismi cellulari.
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
            <img src={bodybuilders_stanchi} alt="" />
          </div>
          <div className="content">
            <h2>
              Il vero problema
            </h2>
            <p>
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
            </p>
          </div>
        </section>

        <section className="spotlight">
          <div className="image">
            <img src={pic3} alt="" />
          </div>
          <div className="content">
            <h2>
              Percorso nutrizionale personalizzato
            </h2>
            <p>
              Non una dieta standard ma un piano costruito su abitudini, obiettivi e stile di vita per ottenere risultati <strong>concreti e sostenibili</strong>.
              <br />
              <br />
              <p>
                <strong>Se fai sport</strong>, potrai avere un percorso per migliorare le performance, aumentare la massa muscolare e/o ridurre la massa grassa senza compromettere energie e allenamenti attraverso un piano che supporta allenamento, recupero e risultati nel tempo.
              </p>
              <p>
                <strong>Se non fai sport</strong>, potrai avere un percorso per migliorare energia, equilibrio e rapporto con il cibo.
              </p>
            </p>
          </div>
        </section>


        <section className="spotlight">
          <div className="image">
            <img src={bodybuilders} alt="" />
          </div>
          <div className="content">
            <h2>
              Risultati che puoi ottenere
            </h2>
            <p>
              Con un approccio corretto puoi ottenere:
              <br />
              <br />
              <ul>
                <li>
                  più energia durante gli allenamenti
                </li>
                <li>
                  recupero più rapido
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
            </p>
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
              <h3>Perchè questo approccio è diverso</h3>
              <strong>Non lavoro con schemi standard.</strong><br /><br />
              Integro:<br />
              - Nutrizione scientifica avanzata<br />
              - Esperienza nell'allenamento<br />
              - Aggiornamento continuo<br />
              <br />
              Non ti do una dieta.<br />
              <strong>Ti do una strategia costruita sul tuo corpo e sul tuo obiettivo.</strong><br />
            </li>
          </ul>
          <ul className="features">
            <li className="icon solid fa-hourglass-end full-width">
              <h3>Disponibilità limitata</h3>
              <strong>Per garantire qualità e attenzione, seguo un numero limitato di persone ogni mese.</strong>
            </li>
          </ul>
          <Scroll type="id" element="cta">
            <a href="#cta" className="button primary">
              Prenota ora
            </a>
          </Scroll>
        </div>
      </section>

      <section id="three" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>Come posso aiutarti</h2>
          </header>
          <ul className="features">
            <li className="icon solid fa-weight full-width">
              <h3>Visita nutrizionale completa</h3>
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
              <h3>Valutazione composizione corporea</h3>
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

      <section id="one" className="wrapper style2 special">
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

        <div class="inner">
          <ContactMe />
        </div>
      </section>

    </Layout>)
}

export default IndexPage;
