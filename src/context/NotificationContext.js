import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addNotification = useCallback(
    ({ title, message, type = "info", duration = 3500 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const createdAt = new Date().toISOString();
      const next = { id, title, message, type, read: false, createdAt };

      setNotifications((prev) => [next, ...prev].slice(0, 30));
      setToasts((prev) => [next, ...prev].slice(0, 5));

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        toasts,
        unreadCount,
        addNotification,
        removeNotification,
        removeToast,
        markNotificationAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};
