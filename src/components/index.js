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
    isFetching: true,
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isFetching: false });
    });
  }

  shelfChange = (book, shelf) => {
    // istanbul ignore next
    BooksAPI.update(book, shelf).then(data => {
      this.setState(({ books }) => {

        // Check if book was added from
        // the search screen
        const isPresent = books.find(b => (
          b.id === book.id
        ));

        // If book was previously selected
        // find book and only change the shelf
        if (!! isPresent) {
          return {
            books: books.filter(b =>
              b.id === book.id ? b.shelf = shelf : b
            )
          }
        }

        // If books was not previously selected,
        // update shelf and add it to the list
        return {
          books: books.concat(
            Object.assign({}, book, { shelf: shelf })
          )
        }
      });
    });
  }

  render() {
    const { books, isFetching } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/romarioraffington/react-mybooks">
                <div className="fork-me-ribbon"></div>
              </a>
              <h1>My<span>Reads</span></h1>
            </div>
            <ShelfContainer
              books={books}
              isFetching={isFetching}
              onShelfChange={this.shelfChange} />
            <div className="open-search">
              <a onClick={() => history.push('/search')}>
                Add a book
              </a>
            </div>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <Search 
            onShelfChange={this.shelfChange}
            isFetching={isFetching}
            onBackClick={() => history.push('/') }
          />
        )}
        />
      </div>
    )
  }
}