import faker from 'faker';

// Shelf
export const getRandomShelf = () => {
  return faker.helpers.randomize([
    'currentlyReading', 
    'wantToRead', 
    'read',
  ]);
} 

//  Book
export const getBook = () => {
  return {
    id: faker.random.uuid(),
    imageLinks: {
      thumbnail: faker.image.imageUrl(),
    }, 
    title: faker.lorem.word(),
    authors: faker.name.findName(),
    shelf: getRandomShelf(),
  }
}

export const generateBookList = (count = 4) => {
  const books = []
  for (let i = 0; i < count; i++) {
    books.push(getBook());
  }
  return books;
}
