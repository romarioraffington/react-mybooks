// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Our Dependencies
import BookList from './index';
import { expect } from '../../util/chai';
import { generateBookList, getRandomShelf } from '../../util/testData';

describe('BookList', () => {
  let wrapper;
  const onShelfChange = jest.fn(),
    onBookClick = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      <BookList 
        books={[]}
        isFetching={false}
        onShelfChange={onShelfChange}
        onBookClick={onBookClick}
      />
    )
  });

  afterEach(() => {
    onShelfChange.mockClear();
    onBookClick.mockClear();
  });

  it('should not render any books', () => {
    expect(wrapper).to.have.exactly(0).descendants('.book');
  });

  it('should render the shelf empty message', () => {
    expect(wrapper).to.have.exactly(1).descendants('.shelf-empty-message');
  });

  describe('when an array of books is passed as props', () => {
    const books = generateBookList();
    beforeEach(() => {
      wrapper.setProps({
          books,
          isFetching: false,
          onShelfChange,
          onBookClick,
      });
    });

    it(`should display ${books.length} books`, () => {
      expect(wrapper).to.have.exactly(books.length).descendants('li');
    });
  }); 
});