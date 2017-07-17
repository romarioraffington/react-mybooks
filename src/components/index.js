// External Dependencies
import React, { Component } from 'react';

// Our Dependencies
import ShelfContainer from './ShelfContainer';
import * as BooksAPI from '../BooksAPI';

export default class App extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  shelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(data => {
      this.setState(({ books }) => ({
        books: books.filter(b => 
          b.id === book.id ? b.shelf = shelf : b
        )
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <ShelfContainer 
            books={this.state.books} 
            onShelfChange={this.shelfChange}/>
          <div className="open-search">
            <a onClick={() => {} }>Add a book</a>
          </div>
        </div>
      </div>
    )
  }
}