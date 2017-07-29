// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Our Dependencies
import Book from '../Book';
import * as BooksAPI from '../../BooksAPI'

export default class BookDetail extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    isUpdatingShelf: PropTypes.bool.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  state = {
    book: {},
    isLoading: true,
  }

  getBook = (bookId) => (
    BooksAPI.get(this.props.bookId)
  )

  // istanbul ignore next
  componentDidMount() {
    this.getBook(this.props.bookId).then(book =>
      this.setState({ book, isLoading: false })
    )
  }

  componentWillReceiveProps(nextProps) {
    this.getBook(nextProps.bookId).then(book =>
      this.setState({ book, isLoading: false })
    ) 
  }


  render() {
    const { book, isLoading} = this.state;
    const { onShelfChange, isUpdatingShelf } = this.props;
    
    return (
      <div className="book-detail">

        { isLoading && (
          <div className="top-container">
            <div className="top-container-fixed-bar">
              <Link to="/" className="back-button"> Close </Link>
              <p className="top-container-text">
                Loading...
              </p>
              <div className="animated loading-bar"></div>
              </div>
          </div>
        )}

        {!isLoading && (
          <div>
            <div className="top-container">
              <div className="top-container-fixed-bar">
                <Link to="/" className="back-button"> Close </Link>
                <p className="top-container-text">
                  {book.title}
                  <span>by {book.authors.join(', ')}</span>
                </p>
                <div className={isUpdatingShelf ? "animated loading-bar" : ""}></div>
              </div>
            </div>

            {/* Container */}
            <div className="book-detail-container">
              <div className="book-detail-book">
                <Book
                  book={book}
                  onShelfChange={onShelfChange}
                />
              </div>

              {/* Meta  */}
              <div className="book-detail-meta">
                { book.pageCount &&
                  <span> Page Count:
                    <strong>{` ${book.pageCount}`} </strong>
                  </span>
                }

                { book.ratingsCount &&
                  <span> Rating:
                    <strong>{` ${book.ratingsCount}`}</strong>
                  </span>
                }

                { book.categories &&
                  <span> Category:
                    <strong>{` ${book.categories.join(', ')}`}</strong>
                  </span>
                }

                {book.previewLink &&
                  <a
                    target="_blank" rel="noopener noreferrer"
                    href={book.previewLink}>
                    more info
                  </a>
                }

                {/* Description  */}
                <div className="book-detail-description">
                  <p>{book.description}</p>
                </div>

                <ul className="book-detail-shelf-status">
                  <li>
                    <input
                      id="currentlyReading"
                      type="radio"
                      name="shelf"
                      checked={book.shelf === "currentlyReading"}
                      onChange={(e) => onShelfChange(book, e.target.id)}
                    />
                    <label htmlFor="currentlyReading">Reading</label>
                  </li>
                  <li>
                    <input
                      id="wantToRead"
                      type="radio"
                      name="shelf"
                      checked={book.shelf === "wantToRead"}
                      onChange={(e) => onShelfChange(book, e.target.id)}
                    />
                    <label htmlFor="wantToRead">Want</label>
                  </li>
                  <li>
                    <input
                      id="read"
                      type="radio"
                      name="shelf"
                      checked={book.shelf === "read"}
                      onChange={(e) => onShelfChange(book, e.target.id)}
                    />
                    <label htmlFor="read">Read</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}