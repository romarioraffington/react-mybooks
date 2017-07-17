// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import * as BooksAPI from '../../BooksAPI';

export default class Search extends Component {
  static propTypes = {
    onBackClick: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    results: [],
  }

  updateQuery = (query) => {
    // Update query state
    this.setState({ query: query.trim() });

    // Fetch books based on query
    BooksAPI.search(query.trim()).then(books => {
      this.setState({ results: books })
    });
  }

  render() {
    const { query, results } = this.state;
    const { onBackClick } = this.props;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => onBackClick()}>Close</a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              { console.log(results) }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}