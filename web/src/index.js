import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import './index.scss';
import Header from './Header/Header';
import Home from './Home/Home';
import About from './About/About';
import Footer from './Footer/Footer';

const Routes = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/About" component={About} />
      </div>
      <Footer />
    </Router>
  </Provider>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
