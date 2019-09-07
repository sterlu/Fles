import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import Header from './Header/Header';
import Home from './Home/Home';
import Reporter from './Reporter/Reporter';

const Routes = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route exact path="/reporter" component={Reporter} />
    </div>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
