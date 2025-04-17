import { useState, useEffect } from 'react';

export const useStorage = () => {
  const getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return { getItem, setItem };
};

// Custom hook for localStorage state
export const useLocalStorage = (key, initialValue) => {
  const { getItem, setItem } = useStorage();
  const [storedValue, setStoredValue] = useState(() => {
    const item = getItem(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    setItem(key, storedValue);
  }, [key, storedValue, setItem]);

  return [storedValue, setStoredValue];
};