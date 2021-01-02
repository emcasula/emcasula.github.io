import React, { useState } from 'react';

import Layout from '../components/Layout';
import Scroll from '../components/Scroll';

import pic1 from '../assets/images/pic01.jpg';
import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';
import config from '../../config';

const IndexPage = () => {

  const [gdprChecked, setGdprChecked] = useState(false)
  const handleClick = () => setGdprChecked(!gdprChecked)

  return (
    <Layout>
      <section id="banner">
        <div className="inner">
          <h2>{config.heading}</h2>
          <p>{config.subHeading}</p>
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
              Chi sono
          </h2>
            <p>
              Ciao, sono la dott.ssa Emanuela Casula e mi occupo di nutrizione.
              Il mio obbiettivo è quello di giudare le persone verso il raggiungimento e mantenimento di uno stile alimentare sano.
              Sono inoltre attenta alla nutrizione sportiva per aiutare atleti, anche amatoriali, a raggiungere i loro obbiettivi di performance e di ricomposizione corporea tramite un'alimentazione adeguata e adatta alla specifica disciplina sportiva.
          </p>
          </header>
        </div>
      </section>

      <section id="two" className="wrapper alt style2">
        <section className="spotlight">
          <div className="image">
            <img src={pic1} alt="" />
          </div>
          <div className="content">
            <h2>
              Bio
          </h2>
            <p>
              La salute e il benessere sono lo scopo dei miei piani alimentari. Che tu sia uno sportivo con dei traguardi da raggiungere o che tu sia interessato a modificare il tuo peso o semplicemente imparare come abbinare i cibi e come mangiare in modo sano e adatto alle tue esigenze, il nostro traguardo finale sarà un miglioramento non solo estetico, ma anche del benessere generale.
          </p>
          </div>
        </section>
        <section className="spotlight">
          <div className="image">
            <img src={pic2} alt="" />
          </div>
          <div className="content">
            <h2>
              Il piacere di un'alimentazione sana
          </h2>
            <p>
              Nei miei piani alimentari non troverai i soliti e rigidi piatti prestabiliti, ma ingredienti da poter combinare per creare nuovi abbinamenti e nuovi sapori. In questo modo la monotonia e la noia degli schemi prestabiliti non si presenteranno e ogni settimana potrai creare qualcosa di diverso ed imparare a mangiare in modo sano, divertendoti.
          </p>
          </div>
        </section>
        <section className="spotlight">
          <div className="image">
            <img src={pic3} alt="" />
          </div>
          <div className="content">
            <h2>
              il nostro percorso
          </h2>
            <p>
              Valuteremo insieme i tuoi obbiettivi (modifiche del peso corporeo, ricomposizione corporea, performance sportiva, educazione alimentare, mangiare equilibrato) e troveremo il percorso adatto a raggiungerli.
            <br />
            "La perseveranza è il segreto di ogni successo".
          </p>
          </div>
        </section>
      </section>

      <section id="three" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>Servizi offerti</h2>
          </header>
          <ul className="features">
            <li className="icon solid fa-weight full-width">
              <h3>Visita nutrizionale completa</h3>
              <p>
                Analisi della composizione corporea e valutazione dello stato nutrizionale, anamnesi alimentare, piano nutrizionale personalizzato. Per soggetti in condizioni fisiologiche o patologiche accertate e per sportivi. Seguiranno periodiche visite di controllo.
            </p>
            </li>
          </ul>
          <ul className="features">
            <li className="icon solid fa-gift full-width">
              <h3>Pacchetti Percorso</h3>
              <p>
                Possibilità di acquistare pacchetti che includono la prima visita e successivi controlli stabiliti secondo un percorso personalizzato.
            </p>
            </li>
          </ul>
          <ul className="features">
            <li className="icon solid fa-utensils">
              <h3>Consulenza nutrizionale</h3>
              <p>
                Raccolta dati, anamnesi alimentare, consigli nutrizionali e correzione delle abitutini alimentari scorrette. Può essere inoltre richiesta l'analisi della composizione corporea.
            </p>
            </li>
            <li className="icon solid fa-child">
              <h3>Valutazione composizione corporea</h3>
              <p>
                Valutazione della massa magra e di quella grassa, del BMI (per stabilire lo stato di normopeso, sovrappeso, obesità). Misura delle circonferenze corporee e invio del referto.
            </p>
            </li>
            <li className="icon solid fa-dumbbell">
              <h3>Consulenze nutrizionali per palestre</h3>
              <p>
                Possibilità di collaborazioni con palestre e centri sportivi
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

      <section id="cta" className="wrapper style4">
        <div className="inner">
          <header>
            <h2>Prenota ora</h2>
            <p>
              Per prenotare o per chiedere informazioni sui percorsi offerti, non esitare a contattarmi.
          </p>
          </header>
        </div>

        <div class="inner">
          <form method="post" action="https://formsubmit.co/8a190bb170b130de0b8d01c967646eca">
            <input type="hidden" name="_next" value="/ThankYou"></input>
            <div className="row gtr-uniform">
              <div className="col-6 col-12-xsmall">
                <input type="text" name="name" id="name" defaultValue="" placeholder="Nome" />
              </div>
              <div className="col-6 col-12-xsmall">
                <input type="email" name="email" id="email" defaultValue="" placeholder="Email" required />
              </div>
              <div className="col-12">
                <textarea name="message" id="message" placeholder="Scrivi il tuo messaggio" rows="6"></textarea>
              </div>
              <div className="col-12-small">
                <input type="checkbox" id="gdpr-consent" name="gdpr-consent" onClick={handleClick} checked={gdprChecked} />
                <label htmlFor="gdpr-consent">Dichiaro di aver letto e compreso l'informativa sulla privacy e acconsento al trattamento dei dati personali ai sensi dell'articolo 13 del Regolamento (UE) 2016/679.</label>
              </div>
              <div className="col-12">
                <a href="/Privacy" target="_blank">Leggi l'informativa</a>
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li><input type="submit" value="Invia Messaggio" className={`primary ${!gdprChecked ? "disabled" : "enabled"}`} /></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </section>

    </Layout>)
}

export default IndexPage;
