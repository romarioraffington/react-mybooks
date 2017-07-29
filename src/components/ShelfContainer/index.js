// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import Shelf from './Shelf';

const ShelfContainer = (props) => {
  const { books, 
          isFetching,
          isUpdatingShelf,
          onShelfChange, 
          onBookClick, 
        } = props;

  return (
    <div className="list-books-content">
      <div>
        <Shelf
          title='Currently Reading'
          onShelfChange={onShelfChange}
          books={books.filter(b => b.shelf === 'currentlyReading')}
          isFetching={isFetching}
          isUpdatingShelf={isUpdatingShelf}
          onBookClick={onBookClick}
        />
        <Shelf
          title='Want to Read'
          onShelfChange={onShelfChange}
          books={books.filter(b => b.shelf === 'wantToRead')}
          isFetching={isFetching}
          isUpdatingShelf={isUpdatingShelf}
          onBookClick={onBookClick}
        />
        <Shelf
          title='Read'
          onShelfChange={onShelfChange}
          books={books.filter(b => b.shelf === 'read')}
          isFetching={isFetching}
          isUpdatingShelf={isUpdatingShelf}
          onBookClick={onBookClick}
        />
      </div>
    </div>
  )
}

ShelfContainer.propTypes = {
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpdatingShelf: PropTypes.bool.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  onBookClick: PropTypes.func.isRequired,
}

export default ShelfContainer;