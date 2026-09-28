import React from 'react';

import { professional } from '../data/professional.mjs';
import ContactMe from '../components/SEO/Contactme';

const IndexPage = () => (
  <>
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
            Puoi prenotare o chiedere informazioni al numero <a href="tel:+393515159912">351 515 9912</a>, su <a href="https://wa.me/393515159912">WhatsApp</a> o tramite <a href="https://www.miodottore.it/profilo/emanuela-casula" rel="nofollow">MioDottore</a>. Prima di prenotare, puoi leggere <a href="/servizi/prima-visita-nutrizionista-cagliari/">come si svolge la prima visita</a>. Durata, costo e modalità sono indicati nella prestazione selezionata nell’agenda.
          </p>
          <ContactMe/>
        </div>
      </section>
    </article>
  </>
);

export default IndexPage;
