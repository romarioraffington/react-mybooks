// External Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Our Dependencies
import ShelfContainer from './ShelfContainer';
import Search from './Search';
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
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelfContainer
              books={this.state.books}
              onShelfChange={this.shelfChange} />
            <div className="open-search">
              <a onClick={() => history.push('/search')}>
                Add a book
              </a>
            </div>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <Search onBackClick={() => history.push('/') }/>
        )}
        />
      </div>
    )
  }
}