import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

// Create context with default values
const NotificationContext = createContext({
  showNotification: () => {},
  clearNotification: () => {},
  showError: () => {},
  showSuccess: () => {},
  showInfo: () => {},
  showWarning: () => {}
});

// Hook to use the notification context
export const useNotification = () => useContext(NotificationContext);

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: 'error' });
  const [notificationQueue, setNotificationQueue] = useState([]);

  // Format the message to ensure it's a proper string
  const formatMessage = useCallback((message) => {
    if (typeof message === 'string') {
      return message;
    }
    if (message instanceof Error) {
      return message.message || 'An error occurred';
    }
    if (message && typeof message === 'object') {
      try {
        return JSON.stringify(message);
      } catch (e) {
        return 'Notification';
      }
    }
    return 'Notification';
  }, []);

  const showNotification = useCallback((message, type = 'error') => {
    const formattedMessage = formatMessage(message);
    
    // Don't show empty messages
    if (!formattedMessage || formattedMessage.trim() === '') {
      return;
    }
    
    // If no active notification, show immediately
    if (!notification.message) {
      setNotification({ message: formattedMessage, type });
    } else {
      // Otherwise, add to queue
      setNotificationQueue(prev => [...prev, { message: formattedMessage, type }]);
    }
  }, [notification, formatMessage]);

  const clearNotification = useCallback(() => {
    setNotification({ message: '', type: 'error' });
    
    // If there are notifications in the queue, show the next one
    if (notificationQueue.length > 0) {
      const nextNotification = notificationQueue[0];
      setNotification(nextNotification);
      setNotificationQueue(prev => prev.slice(1));
    }
  }, [notificationQueue]);

  const showError = useCallback((message) => {
    showNotification(message, 'error');
  }, [showNotification]);

  const showSuccess = useCallback((message) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const showInfo = useCallback((message) => {
    showNotification(message, 'info');
  }, [showNotification]);

  const showWarning = useCallback((message) => {
    showNotification(message, 'warning');
  }, [showNotification]);

  const value = {
    showNotification, 
    clearNotification, 
    showError, 
    showSuccess, 
    showInfo,
    showWarning
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toast 
        message={notification.message} 
        type={notification.type} 
        onClose={clearNotification} 
      />
    </NotificationContext.Provider>
  );
}; 