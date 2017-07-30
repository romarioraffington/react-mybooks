// External Dependencies
import React from 'react';
import faker from 'faker';
import { mount } from 'enzyme';

// Our Dependencies
import Search from './index';
import * as BooksAPI from '../../BooksAPI';
import { expect } from '../../util/chai';
import { generateBookList, getRandomShelf } from '../../util/testData';

// Mocks
jest.mock("react-ga");
jest.mock('../../BooksAPI');

describe('Search', () => {
  let wrapper, books;
  const onBackClick = jest.fn(),
    onShelfChange = jest.fn(),
    onBookClick = jest.fn();


  beforeEach(() => {
    books = generateBookList();

    wrapper = mount(
      <Search
        onBackClick={onBackClick}
        isFetching={false}
        onShelfChange={onShelfChange}
        books={books}
        onBookClick={onBookClick}
      />
    )
  });

  afterEach(() => {
    onBackClick.mockClear();
    onShelfChange.mockClear();
    BooksAPI.search.mockClear();
    onBookClick.mockClear();
  });

  it('should have an empty query state', () => {
    expect(wrapper).to.have.state('query').equal('');
  });

  it('should initalize isSearch state to false', () => {
    expect(wrapper).to.have.state('isSearching').equal(false);
  });

  it('should initialize results state to an empty array', () => {
    expect(wrapper).to.have.state('results').deep.equal([]);
  });

  describe('when the user types in the search input field', () => {
    const value = faker.lorem.word();

    beforeEach(() => {
      // Mock BooksAPI.search implementation
      BooksAPI.search = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          wrapper.setState({ results: books });
          resolve();
        });
      });

     const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value }
      });
    });

    it('should call the `BookAPI.search` function once', () => {
      expect(BooksAPI.search.mock.calls.length).to.equal(1);
    });

    it('should call the `BookAPI.search` with the correct query param', () => {
      expect(BooksAPI.search.mock.calls[0][0]).to.equal(value)
    });

    it(`should update query state with ${value}`, () => {
      expect(wrapper).to.have.state('query').equal(value);
    });

    it('should set the results state with books returned from the API', () => {
      expect(wrapper).to.have.state('results').deep.equal(books);
    });

    it('should update the isSearching state to true',  () => {
      expect(wrapper).to.have.state('isSearching').equal(true);
    });

    it('should render the search not found message', () => {
      const search = wrapper.find('.search-not-found');
      expect(search).not.to.be.present();
    });

    it('should not render the book grid', () => {
      const bookGrid = wrapper.find('.books-grid');
      expect(bookGrid).to.be.present();
    });
  });

  describe('when the search field become empty', () => {
    beforeEach(() => {
      // Mock BooksAPI.search implementation
      BooksAPI.search = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          wrapper.setState({ results: [] });
          resolve();
        });
      });

      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: ''}
      });
    })

    it('should set the results state to an empty array', () => {
      expect(wrapper).to.have.state('results').deep.equal([]);
    });

    it('should not call the Book.search function',  () => {
      expect(BooksAPI.search.mock.calls.length).to.equal(0);
    });

    it('should not update the isSearching state to true',  () => {
      expect(wrapper).to.have.state('isSearching').equal(false);
    })
  });

  describe('when results=[], isSeaching=false and query has a value', () => {
    beforeEach(() => {
      wrapper.setState({ 
        results: [],
        isSearching: false,
        query: faker.lorem.word,
      })
    });


    it('should render the search not found message', () => {
      const search = wrapper.find('.search-not-found');
      expect(search).to.be.present();
    });

    it('should not render the book grid', () => {
      const bookGrid = wrapper.find('.books-grid');
      expect(bookGrid).to.not.be.present();
    });
  });

  describe('when the user clicks the back button', () => {
    beforeEach(() => {
      const backButton = wrapper.find('.close-search').first();
      backButton.simulate('click');
    });

    it('should call `onBackClick` once', () => {
      expect(onBackClick.mock.calls.length).to.equal(1)
    });
  });

  describe('when the a book\'s shelf status is updated', () => {  
    beforeEach(() => {
      books[0].shelf = getRandomShelf();
      wrapper.setProps({ books });
    });

    it('should update the books props', () => {
      expect(wrapper).to.have.prop('books', books)
    });

    // TODO: Figure out a way to test the updated state
    // Currently wrapper.state().results returns []
  })

});