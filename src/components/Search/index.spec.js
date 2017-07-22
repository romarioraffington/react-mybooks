// External Dependencies
import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';

// Our Dependencies
import Search from './index';
import * as BooksAPI from '../../BooksAPI';
import { expect } from '../../util/chai';
import { generateBookList } from '../../util/testData';

// Mock API call
jest.mock('../../BooksAPI');

describe('Search', () => {
  let wrapper;
  const books = generateBookList(),
    onBackClick = jest.fn(),
    onShelfChange = jest.fn();


  beforeEach(() => {
    wrapper = shallow(
      <Search
        onBackClick={onBackClick}
        isFetching={false}
        onShelfChange={onShelfChange}
      />
    )
  });

  afterEach(() => {
    onBackClick.mockClear();
    onShelfChange.mockClear();
    BooksAPI.search.mockClear();
  });

  it('should have an empty query state', () => {
    expect(wrapper).to.have.state('query').equal('');
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

    describe('when the user clicks the back button', () => {
      beforeEach(() => {
        const backButton = wrapper.find('.close-search').first();
        backButton.simulate('click');
      });

      it('should call `onBackClick` once', () => {
        expect(onBackClick.mock.calls.length).to.equal(1)
      });
    });

  });
});