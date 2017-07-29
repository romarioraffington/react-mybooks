// External Dependencies
import React from 'react';
import { shallow } from 'enzyme'

// Our Dependencies
import Book from './index';
import { expect } from '../../util/chai'
import { getBook, getRandomShelf } from '../../util/testData';

describe('Book', () => {
  let wrapper;
  const book = getBook(),
    onShelfChange = jest.fn(),
    onBookClick = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      <Book 
        book={book}
        onShelfChange={onShelfChange}
        onBookClick={onBookClick}
      />
    )  
  });

  afterEach(() => {
    onShelfChange.mockClear();
    onBookClick.mockClear();
  });

  it('should render the correct book title', () => {
    const title = wrapper.find('.book-title');
    expect(title).to.have.text(book.title)
  });

  it('should render the correct author(s)', () => {
    const authors = wrapper.find('.book-authors');
    expect(authors).to.have.text(book.authors)
  })

  describe('when a user clicks on a book', () => {
    beforeEach(() => {
      const bookCover = wrapper.find('.book-cover').first();
      bookCover.simulate('click');
    });

    it('should call the onBookClick function once', () => {
      expect(onBookClick.mock.calls.length).to.equal(1);
    });

    it('should call the onBookClick function with the correct book', () => {
      expect(onBookClick.mock.calls[0][0]).to.deep.equal(book);
    });
  })

  describe('when user selects a different shelf option', () => {
    const value = getRandomShelf();

    beforeEach(() => {
      const select = wrapper.find('select').first();
      select.simulate('change', {
        target: { value }
      })
    });
    
    it('should call `onShelfChange` function once', () => {
      expect(onShelfChange.mock.calls.length).to.equal(1);
    })

    it('should pass the selected book object as the first param', () => {
      expect(onShelfChange.mock.calls[0][0]).to.deep.equal(book);
    });

    it('should pass the new shelf as a the second param', () => {
      expect(onShelfChange.mock.calls[0][1]).to.equal(value);
    })
  });

  describe('when onBookClick is undefined', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Book 
          book={book}
          onShelfChange={onShelfChange}
          onBookClick={undefined}
        />
        )
    });

    it('should not display the book title', () => {
      const title = wrapper.find('.book-title');
      expect(title).to.not.be.present();
    });

    it('should not display the book authors', () => {
      const authors = wrapper.find('.book-authors');
      expect(authors).to.not.be.present();
    });
  })
});