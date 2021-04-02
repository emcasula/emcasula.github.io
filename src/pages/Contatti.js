import React from 'react';

import Layout from '../components/Layout';
import ContactMe from '../components/SEO/Contactme';

const IndexPage = () => (
  <Layout fullMenu>
    <article id="main">
      <header>
        <h2>Dott.ssa Emanuela Casula</h2>
        <p>Biologa Nutrizionista</p>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          <h3>Contatti</h3>
          <p>
            Puoi prenotare o semplicemente chiedere informazioni su un percorso nutrizionale su misura per te al numero <a href="tel:+393515159912">351 515 9912</a> o se preferisci, su <a href="https://wa.me/393515159912">WhatsApp cliccando qui</a>
          </p>
          <p>
            Oppure compila il modulo che trovi qui sotto
          </p>
          <ContactMe/>
        </div>
      </section>
    </article>
  </Layout>
);

export default IndexPage;
