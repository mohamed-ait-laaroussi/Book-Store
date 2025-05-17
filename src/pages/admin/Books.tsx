import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { books } from '../../data/books';
import { Book } from '../../types/Book';

const AdminBooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (bookId: string) => {
    setEditingBook(bookId);
  };

  const handleDelete = (bookId: string) => {
    // In a real app, this would make an API call
    console.log('Deleting book:', bookId);
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBooks(prev => 
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleBulkDelete = () => {
    // In a real app, this would make an API call
    console.log('Bulk deleting books:', selectedBooks);
    setSelectedBooks([]);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Books</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Add, edit, or remove books from your inventory</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Book
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4">
              <div className="flex-grow max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              {selectedBooks.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Selected ({selectedBooks.length})
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="w-8 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedBooks.length === filteredBooks.length}
                      onChange={() => {
                        if (selectedBooks.length === filteredBooks.length) {
                          setSelectedBooks([]);
                        } else {
                          setSelectedBooks(filteredBooks.map(book => book.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBooks.map((book) => (
                  <motion.tr
                    key={book.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleSelectBook(book.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {book.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {book.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {book.genre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.inStock
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {book.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(book.id)}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;