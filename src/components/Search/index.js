// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import * as BooksAPI from '../../BooksAPI';
import { getSuggetions } from '../../util/search';
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
    const suggestions = getSuggetions();

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => onBackClick()}>Close</a>
            <div className={isSearching ? "animated loading-bar" : ""}></div>
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

             {/*  
              If results were returned and something
              was searched for show the following
             */}

             { !!results.length && ( 
              <ol className="books-grid">
                <BookList 
                  onShelfChange={onShelfChange}
                  books={results}
                  isFetching={isFetching}
                />
              </ol>
             )} 

             {/*  
              If no results were returned,
              we are not currently searching
              and text has been typed in the 
              search box then display the following
             */}
            { !results.length && 
              !isSearching &&
              !!query.length && (
                <div className="search-not-found">
                  <h2>Could not find anything 😣</h2>
                  <div>Try search for 
                    <strong> {suggestions[0]} </strong> or 
                    <strong> {suggestions[1]} </strong>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}