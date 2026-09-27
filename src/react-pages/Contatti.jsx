import React from 'react';

import Layout from '../components/Layout';
import { professional } from '../data/professional.mjs';
import ContactMe from '../components/SEO/Contactme';

const IndexPage = () => (
  <Layout fullMenu>
    <article id="main" role="main">
      <header>
        <h1>Contatti e prenotazioni</h1>
        <p>Biologa Nutrizionista</p>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          <h2>Lo studio a Cagliari</h2>
          <address>Studio principale: {professional.address.street}, {professional.address.postalCode} {professional.address.city}</address>
          <p><a href={professional.map}>Apri le indicazioni per raggiungere lo studio</a></p>
          <h2>Prenotazioni e informazioni</h2>
          <p>
            Puoi prenotare o semplicemente chiedere informazioni su un percorso nutrizionale su misura per te al numero <a href="tel:+393515159912">351 515 9912</a> o se preferisci, su <a href="https://wa.me/393515159912">WhatsApp cliccando qui</a>
          </p>
          <p>Prima di prenotare, puoi leggere <a href="/prima-visita-nutrizionista-cagliari/">come si svolge la prima visita</a>. Per durata, costo, eventuali consulenze online e modalità di ricevimento, contattami o consulta la prestazione nell’agenda.</p>
          <ContactMe/>
        </div>
      </section>
    </article>
  </Layout>
);

export default IndexPage;
