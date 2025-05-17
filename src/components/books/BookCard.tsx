import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types/Book';
import { useCart } from '../../context/CartContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };
  
  return (
    <motion.div 
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/books/${book.id}`} className="block">
        <div className="relative overflow-hidden aspect-[2/3]">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity"></div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm ml-1 text-gray-700">{book.rating.toFixed(1)}</span>
            <span className="ml-2 text-xs text-gray-500">({book.genre})</span>
          </div>
          
          <h3 className="font-semibold text-gray-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
            {book.title.length > 25 ? `${book.title.substring(0, 25)}...` : book.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            {book.author}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-600">${book.price.toFixed(2)}</span>
            
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;