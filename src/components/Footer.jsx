import React from 'react';
import config from '../../config.mjs';
import { professional } from '../data/professional.mjs';

export default function Footer() {
  return (
    <footer id="footer">
      <p><strong>Emanuela Casula · Biologa Nutrizionista</strong></p>
      <address>{professional.address.street}, {professional.address.postalCode} {professional.address.city}</address>
      <p><a href={`tel:${professional.phone}`}>{professional.phoneLabel}</a> · <a href={professional.map}>Indicazioni</a></p>
      <nav aria-label="Collegamenti utili"><a href="/prima-visita-nutrizionista-cagliari/">Prima visita</a> · <a href="/Contatti/">Contatti</a> · <a href="/Privacy/">Privacy</a></nav>
      <ul className="icons">
        {config.socialLinks.map(social => {
          const { style, icon, name, url } = social;
          return (
            <li key={url}>
              <a href={url} className={`icon ${style} ${icon}`}>
                <span className="label">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="copyright">
        <li>
          P.IVA 03935130926
        </li>
      </ul>
    </footer>
  );
}
