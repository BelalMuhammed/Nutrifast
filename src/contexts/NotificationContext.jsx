import { createContext, useState, useCallback } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiInformationCircle } from "react-icons/hi";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback(
    (message, type = "success", duration = 4000) => {
      const id = Date.now() + Math.random();
      const notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      // Auto-remove after duration
      setTimeout(() => {
        removeNotification(id);
      }, duration);

      return id;
    },
    [removeNotification]
  );

  const showSuccess = useCallback(
    (message, duration) => {
      return addNotification(message, "success", duration);
    },
    [addNotification]
  );

  const showError = useCallback(
    (message, duration) => {
      return addNotification(message, "error", duration);
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (message, duration) => {
      return addNotification(message, "warning", duration);
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (message, duration) => {
      return addNotification(message, "info", duration);
    },
    [addNotification]
  );

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <HiCheck className='h-5 w-5' />;
      case "error":
        return <HiExclamation className='h-5 w-5' />;
      case "warning":
        return <HiExclamation className='h-5 w-5' />;
      case "info":
        return <HiInformationCircle className='h-5 w-5' />;
      default:
        return <HiCheck className='h-5 w-5' />;
    }
  };

  const getColorClasses = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
      case "error":
        return "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200";
      default:
        return "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccess,
        showError,
        showWarning,
        showInfo,
        addNotification,
        removeNotification,
      }}>
      {children}

      {/* Notification Container */}
      <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-xs w-full space-y-2'>
        {notifications.map((notification) => (
          <Toast key={notification.id}>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getColorClasses(
                notification.type
              )}`}>
              {getIcon(notification.type)}
            </div>
            <div className='ml-3 text-sm font-normal'>
              {notification.message}
            </div>
            <ToastToggle
              onDismiss={() => removeNotification(notification.id)}
            />
          </Toast>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
