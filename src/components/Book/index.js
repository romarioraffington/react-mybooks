import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, onShelfChange, onBookClick }) => {

  const { thumbnail } = book.imageLinks;

  // Replace 'http' image links with 'https'
  // to prevent mix content warnings in console
  const imageUrl = thumbnail ? 
    thumbnail.replace("http", "https") :
    'https://books.google.com/googlebooks/images/no_cover_thumb.gif'

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
          style={{
            width: 128, height: 193,
            backgroundImage: `url("${imageUrl}")`
          }}
          onClick={() => onBookClick && onBookClick(book) }>
        </div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={(e) => onShelfChange(book, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      {/* 
        onBookClick will ONLY be defined when Book 
        component is being rendered from the Search
        or Home Screen. Therefore the code below 
        will prevent the title and author from 
        being displayed on other screens e.g Book Detail
      */}
      { onBookClick && (
        <div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      )}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  onBookClick: PropTypes.func,
}

export default Book;