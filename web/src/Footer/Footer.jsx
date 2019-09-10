import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../Header/logo.svg';

const Footer = () => (
  <div className="footer-wrapper container">
    <div className="flex-container">
      <img alt="logo" src={logo} height="50" />
      <div>
        <Link to="/about">O Projektu</Link>
        <a href="https://twitter.com/FlesNjuz" className="twitter" target="_blank" />
      </div>
    </div>
    <p>
      Sve prikazane naslove je generisala veštačka inteligencija. Sadržaj sajta ni u kom pogledu
      ne prikazuju istinu niti se odnosi na stvarne događaje i ličnosti. Svaka sličnost sa stvarnim
      aktuelnim dešavanjima je slučajna.
    </p>
  </div>
);

export default Footer;
