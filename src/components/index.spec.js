// External Dependencies
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme'

// Our Dependencies
import App from './index';
import * as BooksAPI from '../BooksAPI';
import { expect } from '../util/chai';
import { generateBookList } from '../util/testData';

// Mock API calls
jest.mock('../BooksAPI');

describe('ShelfContainer',  () => {
  let wrapper;
  const books = generateBookList();
  
  beforeEach(() => {
    // Mock Books.getAll implementation
    BooksAPI.getAll = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    });

    wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    BooksAPI.getAll.mockClear();
  });

  it('should render without any errors', () => {
    expect(wrapper).to.be.present();
  });
});