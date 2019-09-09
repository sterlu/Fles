import React from 'react';
import { connect } from 'react-redux';
import Ticker from 'react-ticker';
import './Header.scss';
import logo from './logo.svg';
import store from '../store';

const open = () => store.dispatch({ type: 'REPORTER_OPEN' });

const Header = ({ articles }) => (
  <div className="nav">
    <div className="nav-primary">
      <div className="container">
        <img className="logo" alt="logo" src={logo} height="50" />
        <span className="reporter-cta" onClick={open}>Budi i ti Fleš REPORTER!</span>
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
