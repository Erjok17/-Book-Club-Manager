import { useState, useEffect } from 'react';
import { useStorage } from '../utils/storage';

const ProgressTracker = ({ bookId }) => {
  const [progress, setProgress] = useState(0);
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    const savedProgress = getItem(`book_progress_${bookId}`) || 0;
    setProgress(parseInt(savedProgress));
  }, [bookId, getItem]);

  const handleChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    setItem(`book_progress_${bookId}`, newProgress);
  };

  return (
    <div>
      <h4 className="font-semibold mb-2 dark:text-white">Reading Progress</h4>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleChange}
          className="flex-grow accent-blue-600"
        />
        <span className="w-12 text-right font-medium dark:text-white">
          {progress}%
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>Not Started</span>
        <span>Finished</span>
      </div>
    </div>
  );
};

export default ProgressTracker;