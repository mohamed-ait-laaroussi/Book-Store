import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, TrendingUp, ThumbsUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import BookGrid from '../components/books/BookGrid';
import { books, getTopRatedBooks, getRecommendedBooks } from '../data/books';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [topRatedBooks, setTopRatedBooks] = useState(getTopRatedBooks());
  const [recommendedBooks, setRecommendedBooks] = useState(getRecommendedBooks());
  
  const newReleases = books.sort((a, b) => 
    new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  ).slice(0, 5);
  
  // Update recommendations based on user login state
  useEffect(() => {
    if (user) {
      // In a real app, you would fetch personalized recommendations from the backend
      // For demo purposes, we'll just use different genres
      setRecommendedBooks(getRecommendedBooks(['Fiction', 'Fantasy'], 5));
    } else {
      setRecommendedBooks(getRecommendedBooks([], 5));
    }
  }, [user]);
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover Your Next 
              <span className="text-amber-300"> Favorite Book</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our curated collection of bestsellers, new releases, and hidden gems tailored to your reading preferences.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="#featured" 
                className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
              >
                Explore Books
              </a>
              {!user && (
                <a 
                  href="/auth" 
                  className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Sign Up Now
                </a>
              )}
            </motion.div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full">
          <div className="relative h-full">
            <div className="absolute bottom-0 right-0 h-5/6 w-full bg-cover bg-right opacity-20" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vast Selection</h3>
              <p className="text-gray-600">Browse thousands of titles across every genre imaginable</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">New Releases</h3>
              <p className="text-gray-600">Stay current with the latest and most anticipated new books</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 bg-amber-100 text-amber-600 rounded-full mb-4">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized</h3>
              <p className="text-gray-600">Get recommendations based on your reading preferences</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
              <p className="text-gray-600">Discover hidden gems with our smart recommendation engine</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Personalized Recommendations */}
      <section id="featured" className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <BookGrid 
            books={recommendedBooks} 
            title={user ? "Personalized For You" : "Recommended For You"} 
            subtitle={user ? "Based on your reading preferences and history" : "Popular books our readers love"}
          />
          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View all recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      
      {/* New Releases */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <BookGrid 
            books={newReleases} 
            title="New Releases" 
            subtitle="The latest additions to our collection"
          />
          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              Browse all new releases
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Top Rated */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <BookGrid 
            books={topRatedBooks} 
            title="Top Rated" 
            subtitle="Highly rated by our readers"
          />
          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              Explore all top rated books
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for updates on new releases, exclusive offers, and reading recommendations.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow max-w-md"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;