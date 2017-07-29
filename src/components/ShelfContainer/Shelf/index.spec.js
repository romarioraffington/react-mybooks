// External Dependencies
import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';

// Our Dependencies
import Shelf from './index';
import { expect } from '../../../util/chai';
import { generateBookList } from '../../../util/testData';

describe('Shelf', () => {
  let wrapper;
  const title = faker.lorem.word(),
    books = generateBookList(),
    onShelfChange = jest.fn(),
    onBookClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Shelf
        title={title}
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

  it('should set the correct shelf title', () => {
    const titleWrapper = wrapper.find('.bookshelf-title').first();
    expect(titleWrapper).to.have.text(title);
  });
  
  it('should not render shelf change loader', () => {
    const shelfChangeLoader = wrapper.find('.loading-bar');
    expect(shelfChangeLoader).to.not.be.present()
  });

  describe('when updating a books shelf status', () => {

    beforeEach(() => {
      wrapper.setProps({ 
        title,
        books,
        isFetching: false,
        isUpdatingShelf: true,
        onShelfChange: onShelfChange,
        onBookClick: onBookClick,
      });
    })
     
    it('should render shelf change loader', () => {
      const shelfChangeLoader = wrapper.find('.loading-bar').first();
      expect(shelfChangeLoader).to.be.present()
    });
  })

});