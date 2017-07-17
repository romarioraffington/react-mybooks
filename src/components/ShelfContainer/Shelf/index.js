// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import BookList from '../../BookList';

export default class Shelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { title, books, onShelfChange } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <BookList 
              onShelfChange={onShelfChange}
              books={books} 
            />
          </div>
        </div>
      </div>
    )
  }
}
