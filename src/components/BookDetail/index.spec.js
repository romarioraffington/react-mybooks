// External Depedencies
import React from 'react';
import { shallow } from 'enzyme';

// Our Dependencies
import BookDetail from './index';
import * as BooksAPI from '../../BooksAPI';
import { expect } from '../../util/chai';
import { getBook, getRandomShelf } from '../../util/testData';

// mock API call
jest.mock('../../BooksAPI');

describe('BookDetail', () => {
  let wrapper; 
  const book = getBook(),
  isUpdatingShelf=false,
  onShelfChange=jest.fn();
    
    beforeEach(() => {
      wrapper = shallow(
        <BookDetail
          bookId={book.id}
          isUpdatingShelf={isUpdatingShelf}
          onShelfChange={onShelfChange}
        />
      )
    });

    afterEach(() => {
      BooksAPI.get.mockClear();
      onShelfChange.mockClear();
    });

    it('should intialize book state to an empty object', () => {
      expect(wrapper).to.have.state('book').deep.equal({})
    });

    it('should initialize isLoading state to false', () => {
      expect(wrapper).to.have.state('isLoading').equal(true)
    });

    it('should render the loading bar', () => {
      const loadingBar = wrapper.find('.loading-bar').first();
      expect(loadingBar).to.be.present();
    })

    it('should render the loading text', () => {
      const loadingText = wrapper.find('.top-container-text').first();
      expect(loadingText).to.have.text('Loading...');
    }); 

    it('should not render the book details container', () => {
      const bookDetail = wrapper.find('.book-detail-container');
      expect(bookDetail).to.not.be.present();
    });

    describe('when book is defined and isLoading state is false', () => {
      beforeEach(() => {
        wrapper.setState({
          book,
          isLoading: false
        });
      });

      it('should not render the book details container', () => {
        const bookDetail = wrapper.find('.book-detail-container').first();
        expect(bookDetail).to.be.present();
      });

      it('should not render the loading text', () => {
        const loadingText = wrapper.find('.top-container-text').first();
        expect(loadingText).to.not.have.text('Loading...');
      }); 

      it('should not render the loading bar', () => {
        const loadingBar = wrapper.find('.loading-bar');
        expect(loadingBar).to.not.be.present();
      })

      it(`should check the ${book.shelf} shelf`, () => {
        const option = wrapper.find(`#${book.shelf}`).first();
        expect(option).to.be.checked();
      });

      describe('when a shelf option is selected', () => {
        let shelf, option;

        beforeEach(() => {
          shelf = getRandomShelf();
          option = wrapper.find(`#${shelf}`).first();

          option.simulate('change', {
            target: { id: shelf }
          });
        });

        it('should call `onShelfChange` function once', () => {
          expect(onShelfChange.mock.calls.length).to.equal(1);
        })
    
        it('should pass the selected book object as the first param', () => {
          expect(onShelfChange.mock.calls[0][0]).to.deep.equal(book);
        });
    
        it('should pass the new shelf as a the second param', () => {
          expect(onShelfChange.mock.calls[0][1]).to.equal(shelf);
        });

        describe('when new props are set', () => {
          beforeEach(() => {

            // Mock BooksAPI.get implementation
            BooksAPI.get = jest.fn().mockImplementation(() => {
              return new Promise((resolve, reject) => {
                resolve(book);
              });
            });

            wrapper.setProps({ bookId: book.id });
          });

          it('should call the `BooksAPI.get` function once', () => {
            expect(BooksAPI.get.mock.calls.length).to.equal(1)
          });

          it('should call `BooksAPI.get` with the correct bookId param', () => {
            expect(BooksAPI.get.mock.calls[0][0]).to.equal(book.id);
          });
        });

      });
    });
  });