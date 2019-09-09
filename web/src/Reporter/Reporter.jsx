import React from 'react';
import debounce from 'lodash.debounce';
import './Reporter.scss';
import store from '../store';
import { connect } from 'react-redux';

const close = () => store.dispatch({ type: 'REPORTER_CLOSE' });
const prependArticle = (article) => store.dispatch({ type: 'REPORTER_PREPEND', payload: article, });

class Reporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      _fetchSuggestions: () => {},
      input: '',
      suggestions: [],
      loading: false,
      selected: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
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
    this.setState({ loading: true, selected: -1 });
    const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
    fetch(`${apiBase}/api/suggest/?prefix=${this.state.input}`)
      .then(res => res.json())
      .then(res => this.setState({
        suggestions: res,
        loading: false,
      }))
      .catch((err) => {
        this.setState({
          loading: false,
        });
        console.error(err);
      });
  }

  submit() {
    this.setState({ selected: -1 });
    const initials = this.initialsRef.value;
    const title = this.state.suggestions[this.state.selected];
    const apiBase = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
    fetch(`${apiBase}/api/report/?initials=${initials}&title=${title}`)
      .then(res => res.json())
      .then(res => {
        close();
        prependArticle(res.reported);
        this.setState({ suggestions: [] });
        this.inputRef.value = '';
        this.initialsRef.value = '';
      })
      .catch(console.error);
  }

  render() {
    const { loading, suggestions, selected } = this.state;
    const { isOpen } = this.props;
    return (
      <div className={`reporter-backdrop ${isOpen ? 'open' : ''}`} onClick={close}>
        <div className="reporter-container" onClick={e => e.stopPropagation()}>
          <div className="title">Zdravo, <b>Fleš reporteru!</b></div>

          <div className="inner-container">

            <label htmlFor="title">Tvoj naslov:</label>
            <div className="flex-container">
              <input
                type="text"
                id="title"
                placeholder="Započni naslov..."
                onChange={this.handleChange}
                ref={(ref) => this.inputRef = ref}
              />
              <span className={`loader ${loading ? 'loading' : ''}`} onClick={this.fetchSuggestions}><span /></span>
            </div>
            {
              loading && <h5>Predlozi se učitavaju...</h5>
            }
            {
              suggestions.length > 0 &&
              <div className={`suggestions ${loading ? 'stale' : ''}`}>
                {
                  suggestions.map((item, i) => (
                    <h4
                      key={item}
                      className={i === selected ? 'selected' : ''}
                      onClick={() => this.setState({ selected: i })}
                    >
                      {item}
                    </h4>
                  ))
                }
                <i>Izaberi jedan od naslova</i>
              </div>
            }

            <br />

            <label htmlFor="initials">Inicijali:</label>
            <div className="flex-container">
              <input type="text" id="initials" placeholder="NN" maxLength={2} ref={(ref) => this.initialsRef = ref} />
              <button onClick={this.submit} disabled={loading || selected < 0}>Objavi</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (store) => ({ isOpen: store.reporterOpen });

export default connect(mapStateToProps)(Reporter);
