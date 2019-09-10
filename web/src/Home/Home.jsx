import React from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import Reporter from '../Reporter/Reporter';
import ReporterFAB from './ReporterFAB/ReporterFAB';
import { AdLeftCol, AdRightCol } from '../Ads/Ads';

const formatDate = date => (new Date(date)).toTimeString().substr(0, 5);

const ArticleImage = ({ w, h, article }) => (
  <img
    src={`https://source.unsplash.com/random/${w}x${h}/?${['people', 'sport', 'police'][article.id % 3]}/${article.id}`}
    alt={article.title}
    height={h}
    width={w}
  />
);

class Home extends React.Component {
  render() {
    const { articles, reported } = this.props;
    if (articles.length === 0)
      return <div />;

    return (
      <div className="home-container">
        <div className="main-column">
          <div className="news-item-hero news-item">
            <div>
              <h4 className="category">
                {articles[0].category.toUpperCase()} — {formatDate(articles[0].created)}
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
                    {article.category.toUpperCase()} — {formatDate(article.created)}
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
            reported.map((article) => (
              <div className="news-item news-item-mini" key={article.id}>
                <ArticleImage w={80} h={80} article={article} />
                <div>
                  <h2>
                    <b>{article.pre_title}</b> {article.title}
                  </h2>
                  <h4 className="meta">
                    {article.initials || 'NN'} — {formatDate(article.created)}
                  </h4>
                </div>
              </div>
            ))
          }
        </div>

        <ReporterFAB />

        <Reporter />

        <AdLeftCol />
        <AdRightCol />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  reported: state.reported,
});

export default connect(mapStateToProps)(Home);
