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
    // TODO: Organize Book by Shelf
    // TODO: Pass the book as props to the correct Shelf
    return (
      <div className="list-books-content">
        <div>
          <Shelf
            title='Currently Reading'
            books={books}
          />
          <Shelf
            title='Want to Read'
            books={books}
          />
          <Shelf
            title='Read'
            books={books}
          />
        </div>
      </div>
    )
  }
}