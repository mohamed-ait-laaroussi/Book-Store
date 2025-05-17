import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import BookGrid from '../books/BookGrid';
import { getRecommendedBooks } from '../../data/books';
import { useAuth } from '../../context/AuthContext';

const AIRecommendations: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(getRecommendedBooks([], 4));
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  
  // Genres for selection
  const genres = ['Fiction', 'Science Fiction', 'Fantasy', 'Thriller', 'Mystery', 'Romance', 'Self-Help', 'History', 'Biography', 'Memoir'];
  
  // Generate recommendations based on user preferences
  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (userPreferences.length > 0) {
        setRecommendations(getRecommendedBooks(userPreferences, 4));
      } else {
        setRecommendations(getRecommendedBooks([], 4));
      }
      setIsLoading(false);
    }, 1500);
  };
  
  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setUserPreferences(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };
  
  useEffect(() => {
    // In a real app, we would load user preferences from backend
    if (user) {
      setUserPreferences(['Fiction', 'Thriller']);
    }
  }, [user]);
  
  return (
    <section className="py-12 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">AI-Powered Recommendations</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our advanced AI analyzes reading patterns and preferences to suggest books you'll love. Select your favorite genres below to get personalized recommendations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Your Preferred Genres</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    userPreferences.includes(genre)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            
            <button
              onClick={generateRecommendations}
              disabled={isLoading}
              className={`px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating recommendations...
                </span>
              ) : (
                <span className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Recommendations
                </span>
              )}
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-48 mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookGrid 
              books={recommendations} 
              title="Books You Might Enjoy" 
              subtitle={userPreferences.length > 0 
                ? `Based on your interest in ${userPreferences.join(', ')}`
                : "Based on popular reading trends"
              }
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AIRecommendations;