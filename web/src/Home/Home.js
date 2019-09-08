import React from 'react';
import './Home.scss';

const ArticleImage = ({ w, h, article }) => (
  <img
    src={`https://source.unsplash.com/random/${w}x${h}/?${['people', 'sport', 'police'][article.id % 3]}/${article.id}`}
    alt={article.title}
    height={h}
    width={w}
  />
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.fetchLatest = this.fetchLatest.bind(this);
  }

  fetchLatest() {
    const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
    fetch(`${apiBase}/latest`)
      .then(res => res.json())
      .then(res => this.setState({ articles: res.articles, }))
      .catch(console.error);
    setTimeout(this.fetchLatest, 5 * 60 * 1000);
  }

  componentWillMount() {
    this.fetchLatest();
  }

  render() {
    const { articles } = this.state;
    if (articles.length === 0)
      return <div />;

    return (
      <div className="container home-container">
        <div className="main-column">
          <div className="news-item-hero news-item">
            <div>
              <h4 className="category">
                {articles[0].category.toUpperCase()} — {articles[0].created.substr(11, 5)}
              </h4>
              <h2>
                <b>{articles[0].pre_title}</b> {articles[0].title}
              </h2>
            </div>
            <ArticleImage w={630} h={400} article={articles[0]} />
          </div>
          <div className="flex-container wrap">
            {
              articles.slice(1).map((article) => (
                <div className="news-item" key={article.id}>
                  <ArticleImage w={300} h={200} article={article} />
                  <h4 className="category">
                    {article.category.toUpperCase()} — {article.created.substr(11, 5)}
                  </h4>
                  <h2>
                    <b>{article.pre_title}</b> {article.title}
                  </h2>
                </div>
              ))
            }
          </div>
        </div>
        <div className="right-column">
          <div className="subheader">
            <span>Vesti Fleš reportera</span>
          </div>
          {
            articles.map((article) => (
              <div className="news-item news-item-mini" key={article.id}>
                <ArticleImage w={80} h={80} article={article} />
                <div>
                  <h2>
                    <b>{article.pre_title}</b> {article.title}
                  </h2>
                  <h4 className="category">
                    VS — {article.created.substr(11, 5)}
                  </h4>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
