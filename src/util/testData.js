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
    authors: [faker.name.findName()],
    shelf: getRandomShelf(),
    pageCount: faker.random.number({ min: 1 , max: 200 }),
    ratingsCount: faker.random.number({ min: 1, max: 5}),
    categories: [faker.lorem.word()],
    previewLink: faker.image.imageUrl(),
  }
}

export const generateBookList = (count = 4) => {
  const books = []
  for (let i = 0; i < count; i++) {
    books.push(getBook());
  }
  return books;
}
