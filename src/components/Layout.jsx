import React from 'react';

import '../assets/sass/main.scss';
import Footer from './Footer';
import SideBar from './Sidebar';
const Layout = ({ children, fullMenu }) => (
  <div className="landing main-body is-preload">
    <div id="page-wrapper">
      <SideBar fullMenu={fullMenu} />
      {children}
      <Footer />
    </div>
  </div>
);

export default Layout;
