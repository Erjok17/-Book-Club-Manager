import { useEffect } from 'react';
import { FaTimes, FaBookmark, FaRegBookmark, FaDownload } from 'react-icons/fa';
import DiscussionSection from './DiscussionSection';
import ListDropdown from './ListDropdown';
import ProgressTracker from './ProgressTracker';

const BookModal = ({ book, onClose, onAddToList }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">
            {book.volumeInfo.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Cover'}
                alt={book.volumeInfo.title}
                className="w-48 h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">
                    {book.volumeInfo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    by {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                  </p>
                </div>
                <ListDropdown 
                  book={book} 
                  onAddToList={onAddToList} 
                />
              </div>
              
              <div className="mb-6">
                <ProgressTracker bookId={book.id} />
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2 dark:text-white">Description</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {book.volumeInfo.description || 'No description available.'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-1 dark:text-white">Published</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {book.volumeInfo.publishedDate || 'N/A'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 dark:text-white">Pages</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {book.volumeInfo.pageCount || 'N/A'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 dark:text-white">Publisher</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {book.volumeInfo.publisher || 'N/A'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 dark:text-white">Language</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {book.volumeInfo.language?.toUpperCase() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DiscussionSection bookId={book.id} />
        </div>
      </div>
    </div>
  );
};

export default BookModal;