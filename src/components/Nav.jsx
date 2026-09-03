import React from 'react';

export default function Nav() {
  return (
    <nav id="nav">
      <ul>
        <li className="special">
          <a
            href="#menu"
            className="menuToggle"
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
