import { useState } from 'react';
import { useStorage } from '../utils/storage';
import { FaBookmark, FaRegBookmark, FaChevronDown } from 'react-icons/fa';

const ListDropdown = ({ book, onAddToList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getItem } = useStorage();
  const lists = getItem('reading_lists') || {
    'Want to Read': [],
    'Currently Reading': [],
    'Finished': []
  };

  const isBookInList = (listName) => {
    return lists[listName]?.some(item => item.id === book.id);
  };

  const handleAddToList = (listName) => {
    onAddToList(book, listName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        <FaBookmark className="mr-2" />
        Add to List
        <FaChevronDown className="ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
          {Object.keys(lists).map((listName) => (
            <button
              key={listName}
              onClick={() => handleAddToList(listName)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center ${isBookInList(listName) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {isBookInList(listName) ? (
                <FaBookmark className="mr-2" />
              ) : (
                <FaRegBookmark className="mr-2" />
              )}
              {listName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListDropdown;