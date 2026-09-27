import React from 'react';
import Nav from './Nav';

export default function SideBar({ fullMenu }) {
  return (
    <header id="header" className={`${fullMenu ? '' : 'alt'}`}>
      <p className="site-name">
        <a href="/">Dott.ssa Emanuela Casula</a>
      </p>
      <div className=" ">
        <Nav />
      </div>
    </header>
  );
}
