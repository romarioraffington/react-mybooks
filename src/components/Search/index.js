// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import * as BooksAPI from '../../BooksAPI';
import BookList from '../BookList';

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
    BooksAPI.search(query.trim()).then(resp => {
      let results = [];

      // Only set state if resp is an array
      // since the endpoint returns undefined 
      // and an error object as well
      if (Array.isArray(resp)) {
        results = resp;
      }
      this.setState({ results });
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
              <BookList 
                books={results}
              />
            </ol>
          </div>
        </div>
      </div>
    )
  }
}