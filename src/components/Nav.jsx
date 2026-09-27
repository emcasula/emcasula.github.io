import React from 'react';
import { services } from '../data/professional.mjs';

export default function Nav() {
  return (
    <nav id="nav">
      <ul>
        <li className="special">
          <a
            href="#menu"
            className="menuToggle"
            aria-controls="menu"
            aria-expanded="false"
            aria-label="Apri menu"
          >
            <span>Menu</span>
          </a>
          <div id="menu">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/ChiSono/">Chi sono</a>
              </li>
              {services.map(service => <li key={service.href}><a href={service.href}>{service.title}</a></li>)}
              <li><a href="/prima-visita-nutrizionista-cagliari/">Prima visita</a></li>
              <li><a href="/pubblicazioni-scientifiche/">Pubblicazioni</a></li>
              <li>
                <a href="/Blog/">Blog</a>
              </li>
              <li>
                <a href="/Contatti/">Contatti</a>
              </li>
              <li>
                <a href="/Privacy/">Privacy</a>
              </li>
            </ul>
            <a
              className="close"
              aria-label="Chiudi menu"
              href="#menu"
            >
              {''}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
