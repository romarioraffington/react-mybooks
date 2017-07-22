// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import BookList from '../../BookList';

export default class Shelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isUpdatingShelf: PropTypes.bool.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { title, books, isFetching, isUpdatingShelf, onShelfChange } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <div className={isUpdatingShelf ? "animated shelf-change-loader" : ""}></div>
            <BookList
              onShelfChange={onShelfChange}
              books={books}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
    )
  }
}
