import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.scss';
import Header from './Header/Header';
import Home from './Home/Home';

const Routes = () => (
  <Provider store={store}>
    <div>
      <Header />
      <Home />
    </div>
  </Provider>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
