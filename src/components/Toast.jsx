import React, { useEffect } from 'react';

const Toast = ({ message, type = 'error', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const formattedMessage = typeof message === 'string' 
    ? message 
    : message instanceof Error 
      ? message.message || 'An error occurred' 
      : 'Notification';

  const bgColor = type === 'error' ? 'bg-red-500' : 
                 type === 'success' ? 'bg-green-500' : 
                 type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-md`}>
        <span className="mr-2 break-words">{formattedMessage}</span>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast; 