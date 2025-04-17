import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BookCard = ({ book, onOpenModal }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="cursor-pointer" 
        onClick={() => onOpenModal(book)}
      >
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Cover'}
          alt={book.volumeInfo.title}
          className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-600"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 dark:text-white">
            {book.volumeInfo.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center">
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {book.volumeInfo.publishedDate?.substring(0, 4) || 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default BookCard;