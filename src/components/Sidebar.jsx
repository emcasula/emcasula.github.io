import React from 'react';
import Nav from './Nav';

export default function SideBar({ fullMenu }) {
  return (
    <header id="header" className={`${fullMenu ? '' : 'alt'}`}>
      <h1>
        <a href="/">Dott.ssa Emanuela Casula</a>
      </h1>
      <div className=" ">
        <Nav />
      </div>
    </header>
  );
}
