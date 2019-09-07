import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import logo from './logo.svg';

export default () => (
  <div className="nav">
    <div className="nav-primary">
      <div className="container">
        <Link to="/" className="logo"><img alt="logo" src={logo} height="50" /></Link>
        <Link to="/reporter" className="reporter-cta">Budi i ti Fleš REPORTER!</Link>
      </div>
    </div>
    <div className="nav-secondary">
      <div className="container">

      </div>
    </div>
  </div>
)
