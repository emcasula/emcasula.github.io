import React from 'react';

import '../assets/sass/main.scss';
import Footer from './Footer';
import SideBar from './Sidebar';
const Layout = ({ children, fullMenu }) => (
  <div className="landing main-body is-preload">
    <div id="page-wrapper">
      <a className="skip-link" href="#page-content">Vai al contenuto</a>
      <SideBar fullMenu={fullMenu} />
      <div id="page-content" tabIndex={-1}>{children}</div>
      <Footer />
    </div>
  </div>
);

export default Layout;
