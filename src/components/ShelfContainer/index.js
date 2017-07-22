// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import Shelf from './Shelf';

export default class ShelfContainer extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isUpdatingShelf: PropTypes.bool.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { books, isFetching, isUpdatingShelf, onShelfChange } = this.props;
    return (
      <div className="list-books-content">
        <div>
          <Shelf
            title='Currently Reading'
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === 'currentlyReading')}
            isFetching={isFetching}
            isUpdatingShelf={isUpdatingShelf}
          />
          <Shelf
            title='Want to Read'
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === 'wantToRead')}
            isFetching={isFetching}
            isUpdatingShelf={isUpdatingShelf}
          />
          <Shelf
            title='Read'
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === 'read')}
            isFetching={isFetching}
            isUpdatingShelf={isUpdatingShelf}
          />
        </div>
      </div>
    )
  }
}