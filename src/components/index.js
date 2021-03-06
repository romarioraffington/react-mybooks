// External Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Our Dependencies
import { track } from '../util/analytics';
import * as BooksAPI from '../BooksAPI';

// Components
import ShelfContainer from './ShelfContainer';
import BookDetail from './BookDetail';
import Search from './Search';

export default class App extends Component {
  state = {
    books: [],
    isFetching: true,
    isUpdatingShelf: false,
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isFetching: false });
    });
    track(window);
  }

  
  shelfChange = (book, shelf) => { 
    // istanbul ignore next
    this.setState({ isUpdatingShelf: true });
    
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
            isUpdatingShelf: false,
            books: books.filter(b =>
              b.id === book.id ? b.shelf = shelf : b
            )
          }
        }

        // If books was not previously selected,
        // update shelf and add it to the list
        return {
          isUpdatingShelf: false,
          books: books.concat(
            Object.assign({}, book, { shelf: shelf })
          )
        }
      });
    });
  }

  render() {
    const { books, isFetching, isUpdatingShelf } = this.state;
    // istanbul ignore next
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
              isUpdatingShelf={isUpdatingShelf}
              onShelfChange={this.shelfChange} 
              onBookClick={(book) => (
                history.push(`book/${book.id}`)
              )}
              />
            <div className="open-search">
              <a onClick={() => {
                localStorage.lastQuery = '';
                history.push('/search')}
              }>
                Add a book
              </a>
            </div>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <Search 
            books={books}
            onShelfChange={this.shelfChange}
            isFetching={isFetching}
            onBackClick={() => history.push('/') }
            onBookClick={(book) => (
              history.push(`book/${book.id}`)
            )}
          />
        )}
        />
        <Route path='/book/:id' render={({ history, match }) => (   
          <BookDetail 
            bookId={match.params.id}
            history={history}
            isUpdatingShelf={isUpdatingShelf}
            onShelfChange={this.shelfChange} 
          />    
        )}
        />  
      </div>
    )
  }
}