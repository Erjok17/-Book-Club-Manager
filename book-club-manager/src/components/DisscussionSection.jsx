import { useState, useEffect } from 'react';
import { FaUser, FaComment, FaPaperPlane } from 'react-icons/fa';
import { useStorage } from '../utils/storage';

const DiscussionSection = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    const savedComments = getItem(`book_comments_${bookId}`) || [];
    setComments(savedComments);
  }, [bookId, getItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      text: newComment,
      timestamp: new Date().toISOString(),
      user: 'Guest User'
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setItem(`book_comments_${bookId}`, updatedComments);
    setNewComment('');
  };

  return (
    <div className="mt-8 pt-6 border-t dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 flex items-center dark:text-white">
        <FaComment className="mr-2" /> Discussion
      </h3>
      
      <div className="mb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                  <FaUser />
                </div>
                <div>
                  <p className="font-medium dark:text-white">{comment.user}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-11">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Post
        </button>
      </form>
    </div>
  );
};

export default DiscussionSection;