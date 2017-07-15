// External Dependencies
import React, { Component } from 'react';

// Our Dependencies
import ShelfContainer from './ShelfContainer';
import * as books from './data.json';

export default class App extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    // TODO: Get the data from the API
    this.setState({ books: books.books });
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <ShelfContainer books={this.state.books} />
          <div className="open-search">
            <a onClick={() => {} }>Add a book</a>
          </div>
        </div>
      </div>
    )
  }
}