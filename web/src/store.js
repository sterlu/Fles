import { createStore } from 'redux';

const reducer = (state = {
  reporterOpen: false,
  articles: [],
  reported: [],
  articles_loading: true,
}, action) => {
  switch (action.type) {
    case 'REPORTER_OPEN':
      return {
        ...state,
        reporterOpen: true,
      };
    case 'REPORTER_CLOSE':
      return {
        ...state,
        reporterOpen: false,
      };
    case 'REPORTER_TOGGLE':
      return {
        ...state,
        reporterOpen: !state.reporterOpen,
      };
    case 'REPORTER_PREPEND':
      return {
        ...state,
        reported: [
          { ...action.payload },
          ...state.reported,
        ]
      };
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
        reported: action.payload.reported,
      };

    default:
      return state;
  }
};

const reduxDevToolsEnchancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, reduxDevToolsEnchancer);

const fetchLatest = () => {
  store.dispatch({ type: 'ARTICLES_REQUEST' });
  // const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://fles.news';
  const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
  fetch(`${apiBase}/latest`)
    .then(res => res.json())
    .then(res => store.dispatch({ type: 'ARTICLES_SUCCESS', payload: { articles: res.articles, reported: res.reported } }))
    .catch(console.error);
  setTimeout(fetchLatest, 1 * 60 * 1000);
};

fetchLatest();

export default store;
