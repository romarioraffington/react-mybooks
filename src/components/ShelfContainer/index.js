// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import Shelf from './Shelf';

export default class ShelfContainer extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { books } = this.props;
    return (
      <div className="list-books-content">
        <div>
          <Shelf
            title='Currently Reading'
            books={books.filter(b => b.shelf === 'currentlyReading')}
          />
          <Shelf
            title='Want to Read'
            books={books.filter(b => b.shelf === 'wantToRead')}
          />
          <Shelf
            title='Read'
            books={books.filter(b => b.shelf === 'read')}
          />
        </div>
      </div>
    )
  }
}