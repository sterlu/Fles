import React from 'react';
import { Link } from 'react-router-dom';
import Ticker from 'react-ticker';

import './Header.scss';

import logo from './logo.svg';
import { connect } from 'react-redux';

const Header = ({ articles }) => (
  <div className="nav">
    <div className="nav-primary">
      <div className="container">
        <Link to="/" className="logo"><img alt="logo" src={logo} height="50" /></Link>
        <Link to="/reporter" className="reporter-cta">Budi i ti Fleš REPORTER!</Link>
      </div>
    </div>
    <div className="nav-secondary">
      {
        articles.length > 0 &&
        <Ticker>
          {
            ({ index }) => (
              <span><b>{articles[index % articles.length].pre_title}</b> {articles[index % articles.length].title}</span>
            )
          }
        </Ticker>
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  articles: state.articles,
});

export default connect(mapStateToProps)(Header);
