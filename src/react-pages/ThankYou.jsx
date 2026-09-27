import React from 'react';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout fullMenu>
    <section role="main" id="three" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h1>Grazie!</h1>
          </header>
          <ul className="features">
            <li className="icon solid fa-thumbs-up full-width">
              <h3>Grazie per avermi contattato</h3>
              <p>
              Ho ricevuto il tuo messaggio, ti risponderò al più presto.
              Se hai urgenza puoi contattarmi su Whatsapp al numero che trovi qui in basso.
            </p>
            </li>
          </ul>
        </div>
      </section>
  </Layout>
);

export default IndexPage;
