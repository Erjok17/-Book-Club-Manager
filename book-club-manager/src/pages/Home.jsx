import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import ThemeToggle from '../components/ThemeToggle';
import { useStorage } from '../utils/storage';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getItem, setItem } = useStorage();

  const searchBooks = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = (book, listName) => {
    const lists = getItem('reading_lists') || {
      'Want to Read': [],
      'Currently Reading': [],
      'Finished': []
    };
    
    // Remove book from all lists first
    Object.keys(lists).forEach(list => {
      lists[list] = lists[list].filter(item => item.id !== book.id);
    });
    
    // Add to selected list
    lists[listName] = [...lists[listName], book];
    setItem('reading_lists', lists);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Book Club Manager</h1>
          <ThemeToggle />
        </div>
        
        <SearchBar onSearch={searchBooks} />
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Searching for books...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onOpenModal={() => setSelectedBook(book)}
              />
            ))}
          </div>
        )}
        
        {!loading && books.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Search for books to get started. Try "Dune", "Harry Potter", or your favorite author.
            </p>
          </div>
        )}
        
        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onAddToList={handleAddToList}
          />
        )}
      </div>
    </div>
  );
};

export default Home;