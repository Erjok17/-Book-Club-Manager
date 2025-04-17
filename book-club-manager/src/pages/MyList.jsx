import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { useStorage } from '../utils/storage';
import ThemeToggle from '../components/ThemeToggle';

const MyLists = () => {
  const { getItem } = useStorage();
  const lists = getItem('reading_lists') || {
    'Want to Read': [],
    'Currently Reading': [],
    'Finished': []
  };

  const exportLists = () => {
    const dataStr = JSON.stringify(lists, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportName = `book-club-lists_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Search
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={exportLists}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <FaDownload className="mr-2" /> Export Lists
            </button>
            <ThemeToggle />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 dark:text-white">My Reading Lists</h1>
        
        {Object.entries(lists).map(([listName, books]) => (
          <div key={listName} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">{listName} ({books.length})</h2>
            
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onOpenModal={() => {}}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No books in this list yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;