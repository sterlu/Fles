import React from 'react';
import debounce from 'lodash.debounce';

import './Reporter.scss';

class Reporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _fetchSuggestions: () => {},
      suggestions: [],
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
  }

  componentWillMount() {
    this.setState({
      _fetchSuggestions: debounce(this.fetchSuggestions, 1000),
    });
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
      loading: true,
    });
    this.state._fetchSuggestions();
  }

  fetchSuggestions() {
    this.setState({ loading: true, });
    fetch('http://fles.news/api/suggest/?prefix=' + this.state.input)
      .then(res => res.json())
      .then(res => this.setState({
        suggestions: res,
        loading: false,
      }))
      .catch(console.error);
  }

  render() {
    const { loading, suggestions } = this.state;
    return (
      <div className="container reporter-container">
        <h1>Zdravo, Fleš reporteru!</h1>

        <input type="text" placeholder="Tvoj naslov..." onChange={this.handleChange} />
        {
          loading && 'Predlozi se učitavaju...'
        }
        {
          suggestions.length > 0 &&
          <div className={`suggestion-list ${loading ? 'stale' : ''}`}>
            {
              suggestions.map((item) => (
                <div>{item}</div>
              ))
            }
            <span onClick={this.fetchSuggestions}>još</span>
          </div>
        }
      </div>
    );
  }
}

export default Reporter;
