import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import BookGrid from '../components/books/BookGrid';
import { getBookById, getRelatedBooks } from '../data/books';
import { useCart } from '../context/CartContext';
import { Book } from '../types/Book';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundBook = getBookById(id);
        setBook(foundBook || null);
        
        if (foundBook) {
          setRelatedBooks(getRelatedBooks(foundBook));
        }
      }
      
      setLoading(false);
    }, 300);
  }, [id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the book you're looking for.</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to books
        </button>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {/* Book Cover */}
            <div className="flex justify-center">
              <motion.div 
                className="relative overflow-hidden rounded-lg shadow-lg max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            {/* Book Details */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(book.rating)
                        ? 'text-yellow-500 fill-current'
                        : index < book.rating
                        ? 'text-yellow-500 fill-current opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-700">({book.rating.toFixed(1)})</span>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-bold text-blue-600 mb-1">${book.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">
                  {book.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>
              
              <div className="prose text-gray-700 mb-6">
                <p>{book.description}</p>
              </div>
              
              <div className="border-t border-gray-200 py-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Genre:</span> {book.genre}
                  </div>
                  <div>
                    <span className="font-medium">Published:</span> {new Date(book.publicationDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {book.pages}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-gray-800 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={!book.inStock}
                  className={`flex-grow sm:flex-grow-0 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    book.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                
                <button
                  className="px-3 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
                
                <button
                  className="px-3 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-12">
            <BookGrid 
              books={relatedBooks} 
              title="Related Books" 
              subtitle="You might also like these books"
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default BookDetail;