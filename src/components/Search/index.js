import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  static propTypes = {
    onBackClick: PropTypes.func.isRequired,
  }

  state = {
    query: '',
  }

  render() {
    const { query } = this.state;
    const { onBackClick } = this.props;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => onBackClick() }>Close</a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(e) => {}}
              />
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