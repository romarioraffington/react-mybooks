// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import Shelf from './Shelf';

export default class ShelfContainer extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { books, onShelfChange } = this.props;
    return (
      <div className="list-books-content">
        <div>
          <Shelf
            title='Currently Reading'
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === 'currentlyReading')}
          />
          <Shelf
            title='Want to Read'
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === 'wantToRead')}
          />
          <Shelf
            title='Read'
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === 'read')}
          />
        </div>
      </div>
    )
  }
}