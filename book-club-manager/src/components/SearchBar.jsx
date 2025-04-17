import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-8 w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books by title or author..."
        className="px-4 py-3 rounded-l-lg focus:outline-none w-full border border-r-0 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg border border-l-0 border-blue-600"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;