import { createStore } from 'redux';

const reducer = (state = {
  articles: [],
  articles_loading: true,
}, action) => {
  switch (action.type) {
    case 'ARTICLES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'ARTICLES_SUCCESS':
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
      };

    default:
      return state;
  }
};

const reduxDevToolsEnchancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, reduxDevToolsEnchancer);

const fetchLatest = () => {
  console.log('fetchLatest');
  store.dispatch({ type: 'ARTICLES_REQUEST' });
  const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://fles.news';
  fetch(`${apiBase}/latest`)
    .then(res => res.json())
    .then(res => store.dispatch({ type: 'ARTICLES_SUCCESS', payload: { articles: res.articles, } }))
    .catch(console.error);
  setTimeout(fetchLatest, 5 * 1000);
};

fetchLatest();

export default store;
