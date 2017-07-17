import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    const { onBackClick } = this.props;
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => {} }>Close</a>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      </div>
    )
  }
}