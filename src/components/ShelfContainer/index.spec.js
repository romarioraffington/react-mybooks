// External Dependencies
import React from 'react';
import { shallow } from 'enzyme'

// Our Dependencies
import ShelfContainer from './index';
import { expect } from '../../util/chai';
import { generateBookList } from '../../util/testData';


describe('ShelfContainer', () => {
  let wrapper;
  const books = generateBookList(),
    onShelfChange = jest.fn(),
    onBookClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ShelfContainer
        books={books}
        isFetching={false}
        isUpdatingShelf={false}
        onShelfChange={onShelfChange}
        onBookClick={onBookClick}
      />
    )
  });

  afterEach(() => {
    onShelfChange.mockClear();
    onBookClick.mockClear();
  });

  it('should render without any errors', () => {
    expect(wrapper).to.be.present();
  })
})