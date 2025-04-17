import axios from 'axios';

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
    );
    return response.data.items || [];
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};