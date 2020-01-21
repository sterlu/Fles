import { createStore } from 'redux';
import reportedData from './data/reported.csv';
import generatedData from './data/generated.csv';

const reportedArticles = reportedData.slice(1);
const generatedArticles = generatedData.slice(1);

const pickRandom = (arr, n) => {
  const picked = [];
  for (let i = 0; i < n; i++) {
    picked.push(arr[Math.floor(arr.length * Math.random())]);
  }
  return picked.map(a => ({
    id: a[0],
    title: a[1],
    category: a[2],
    created: a[3],
    pre_title: a[4],
    initials: a[5],
  }));
};

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
  if (process.env.REACT_APP_GHPAGES) {
    console.log('All data & code available at https://github.com/sterlu/Fles');
    store.dispatch({
      type: 'ARTICLES_SUCCESS',
      payload: {
        articles: pickRandom(generatedArticles, 26),
        reported: pickRandom(reportedArticles, 18),
      }
    })
  } else {
    const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
    fetch(`${apiBase}/latest`)
      .then(res => res.json())
      .then(res => store.dispatch({
        type: 'ARTICLES_SUCCESS',
        payload: { articles: res.articles, reported: res.reported }
      }))
      .catch(console.error);
    setTimeout(fetchLatest, 1 * 60 * 1000);
  }
};

fetchLatest();

export default store;
