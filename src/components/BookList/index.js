import React from 'react';
import PropTypes from 'prop-types';

const BookList = (props) => {
  const { books, isFetching, onShelfChange } = props;
  return (
    <ol className="books-grid">
      {isFetching ?
        <li className="is-loading-shelf">Loading</li> : (
          books.length > 0 ? (
            books.map((book, i) => (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf} onChange={(e) => onShelfChange(book, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
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
  onShelfChange: PropTypes.func.isRequired,
}

export default BookList;
