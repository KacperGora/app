import React, { createContext, ReactNode, useState } from 'react';

import NotificationBanner from 'components/NotificationBanner';

type NotificationType = {
  message: string;
  type: 'error' | 'success';
};

type NotificationContextType = {
  notification: NotificationType | null;
  showNotification: (message: string, type: 'error' | 'success') => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  const showNotification = (message: string, type: 'error' | 'success') => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      <NotificationBanner />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  const { notification, showNotification } = context;

  return { notification, showNotification };
};
