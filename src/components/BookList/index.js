// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import Book from '../Book';

const BookList = (props) => {
  const { books, isFetching, onShelfChange, onBookClick } = props;
  return (
    <ol className="books-grid">
      {isFetching ?
        <li className="is-loading-shelf">Loading</li> : (
          books.length > 0 ? (
            books.map((book, i) => (
              <li key={i}>
                <Book 
                  book={book} 
                  onShelfChange={onShelfChange}
                  onBookClick={onBookClick}
                />
              </li>
            ))
          ) : (
              <li>
                {window.location.pathname === '/' && (
                  <h2 className="shelf-empty-message">
                    Add 📚 to this shelf 🤓
                  </h2>
                )}
              </li>
            )
        )}
    </ol>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onShelfChange: PropTypes.func,
  onBookClick: PropTypes.func.isRequired,
}

export default BookList;
