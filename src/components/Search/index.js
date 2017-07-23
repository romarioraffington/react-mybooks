// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import * as BooksAPI from '../../BooksAPI';
import BookList from '../BookList';

export default class Search extends Component {
  static propTypes = {
    onBackClick: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    isSearching: false,
    results: [],
  }

  updateQuery = (query) => {
    // Update query and isSearching state
    this.setState({ query, isSearching: true });

    // Fetch books based on query
    BooksAPI.search(query.trim()).then(resp => {
      let results = [];

      // Only set state if resp is an array
      // since the endpoint returns undefined 
      // and an error object as well
      if (Array.isArray(resp)) {
        results = resp;
      }
      this.setState({ results, isSearching: false });
    });
  }

  render() {
    const { query, results, isSearching } = this.state;
    const { onBackClick, onShelfChange, isFetching } = this.props;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => onBackClick()}>Close</a>
            <div className={isSearching ? "animated shelf-change-loader" : ""}></div>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by Title or Author"
                value={query}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              <BookList 
                onShelfChange={onShelfChange}
                books={results}
                isFetching={isFetching}
              />
            </ol>
          </div>
        </div>
      </div>
    )
  }
}