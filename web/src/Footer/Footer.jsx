import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../Header/logo.svg';

const Footer = () => (
  <div className="footer-wrapper container flex-container wrap">
    <img alt="logo" src={logo} height="50" />
    <div>
      <Link to="/about">
        O Projektu
      </Link>
    </div>
  </div>
);

export default Footer;
