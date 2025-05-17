import React from 'react';
import BookCard from './BookCard';
import { Book } from '../../types/Book';

interface BookGridProps {
  books: Book[];
  title?: string;
  subtitle?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title, subtitle }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-800">No books found</h3>
        <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      {title && (
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;