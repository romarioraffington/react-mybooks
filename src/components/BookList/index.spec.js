// External Dependencies
import React from 'react';
import { shallow, mount } from 'enzyme';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

// Our Dependencies
import BookList from './index';
import { expect } from '../../util/chai';
import { generateBookList, getRandomShelf } from '../../util/testData';

describe('BookList', () => {
  let wrapper;
  const onShelfChange = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      <BookList 
        books={[]}
        onShelfChange={onShelfChange}
      />
    )
  });

  afterEach(() => {
    onShelfChange.mockClear();
  });

  it('should not render any books', () => {
    expect(wrapper).to.have.exactly(0).descendants('li');
  });

  describe('pass in an array of books to books props', () => {
    const books = generateBookList();
    beforeEach(() => {
      wrapper = mount(
        <BookList 
          books={books}
          onShelfChange={onShelfChange}
      />
      )
    });

    it(`should display ${books.length} books`, () => {
      expect(wrapper).to.have.exactly(books.length).descendants('li');
    });

    it(`should select '${books[0].shelf}' as the shelf for the first book`, () => {
      const select = wrapper.find('select').first();
      expect(select).to.have.value(books[0].shelf);
    });

    it('should render the correct thumbnail url for the first book', () => {
      const thumbnail = wrapper.find('.book-cover').first();
      expect(thumbnail).to.have.text(books[0].thumbnail);
    });

    it('should render the correct title for the first book', () => {
      const title = wrapper.find('.book-title').first();
      expect(title).to.have.text(books[0].title);
    });

    it('should render the correct thumbnail author for the first book', () => {
      const author = wrapper.find('.book-authors').first();
      expect(author).to.have.text(books[0].author);
    });
    
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
        expect(onShelfChange.mock.calls[0][0]).to.deep.equal(books[0]);
      });

      it('should pass the new shelf as a the second param', () => {
        expect(onShelfChange.mock.calls[0][1]).to.equal(value);
      })
    });
  });
    
});