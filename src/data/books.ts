import { Book } from '../types/Book';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 24.99,
    rating: 4.6,
    genre: 'Thriller',
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    publicationDate: '2019-02-05',
    pages: 336,
    inStock: true
  },
  {
    id: '2',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 22.95,
    rating: 4.8,
    genre: 'Fiction',
    description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.',
    publicationDate: '2018-08-14',
    pages: 384,
    inStock: true
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.pexels.com/photos/6475045/pexels-photo-6475045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 18.99,
    rating: 4.7,
    genre: 'Self-Help',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    publicationDate: '2018-10-16',
    pages: 320,
    inStock: true
  },
  {
    id: '4',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/4753997/pexels-photo-4753997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 20.49,
    rating: 4.5,
    genre: 'Fiction',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    publicationDate: '2020-09-29',
    pages: 304,
    inStock: true
  },
  {
    id: '5',
    title: 'Educated: A Memoir',
    author: 'Tara Westover',
    coverImage: 'https://images.pexels.com/photos/6344231/pexels-photo-6344231.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 16.95,
    rating: 4.7,
    genre: 'Memoir',
    description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent.",
    publicationDate: '2018-02-20',
    pages: 352,
    inStock: true
  },
  {
    id: '6',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 25.49,
    rating: 4.8,
    genre: 'Science Fiction',
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    publicationDate: '2021-05-04',
    pages: 496,
    inStock: true
  },
  {
    id: '7',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverImage: 'https://images.pexels.com/photos/7299908/pexels-photo-7299908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 23.99,
    rating: 4.5,
    genre: 'Historical Fiction',
    description: 'Texas, 1934. Millions are out of work and a drought has broken the Great Plains. Farmers are fighting to keep their land and their livelihoods as the crops are failing, the water is drying up, and dust threatens to bury them all. One of the darkest periods of the Great Depression, the Dust Bowl era, has arrived with a vengeance.',
    publicationDate: '2021-02-02',
    pages: 464,
    inStock: true
  },
  {
    id: '8',
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    coverImage: 'https://images.pexels.com/photos/6801651/pexels-photo-6801651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 21.99,
    rating: 4.6,
    genre: 'Fantasy',
    description: 'France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world.',
    publicationDate: '2020-10-06',
    pages: 448,
    inStock: true
  }
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

// Get related books based on genre
export const getRelatedBooks = (book: Book, limit = 4): Book[] => {
  return books
    .filter(b => b.id !== book.id && b.genre === book.genre)
    .slice(0, limit);
};

// Get recommended books based on user preferences
export const getRecommendedBooks = (genres: string[] = [], limit = 4): Book[] => {
  // If no genres provided, return random books
  if (genres.length === 0) {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }
  
  // Filter books that match the provided genres
  const matchingBooks = books.filter(book => genres.includes(book.genre));
  
  // If there are enough matching books, return them
  if (matchingBooks.length >= limit) {
    const shuffled = [...matchingBooks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }
  
  // Otherwise, add some random books to fill the limit
  const shuffled = [...books]
    .filter(book => !matchingBooks.includes(book))
    .sort(() => 0.5 - Math.random());
  
  return [...matchingBooks, ...shuffled].slice(0, limit);
};

// Get top-rated books
export const getTopRatedBooks = (limit = 4): Book[] => {
  return [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Search books by title or author
export const searchBooks = (query: string): Book[] => {
  const lowerCaseQuery = query.toLowerCase();
  return books.filter(
    book => 
      book.title.toLowerCase().includes(lowerCaseQuery) || 
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.genre.toLowerCase().includes(lowerCaseQuery)
  );
};