import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useStorage } from '../utils/storage';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    const savedTheme = getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [getItem]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setItem('theme', !darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;