import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout fullMenu>
    <Helmet
      meta={[
        { name: 'robots', content: 'noindex' },
      ]}
    >
    </Helmet>
    
    <section id="three" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>Grazie!</h2>
          </header>
          <ul className="features">
            <li className="icon solid fa-thumbs-up full-width">
              <h3>Grazie per avermi contattato</h3>
              <p>
              Ho ricevuto il tuo messaggio, ti risponderò al più presto.
              Se hai urgenza puoi contattarmi al numero che trovi sui social qui in basso.
            </p>
            </li>
          </ul>
        </div>
      </section>
  </Layout>
);

export default IndexPage;
