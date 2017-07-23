// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import BookList from '../../BookList';

const Shelf = (props) => {
  const { title, books, isFetching, isUpdatingShelf, onShelfChange } = props;
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <div className={isUpdatingShelf ? "animated loading-bar" : ""}></div>
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

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpdatingShelf: PropTypes.bool.isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default Shelf;