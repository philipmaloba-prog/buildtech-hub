import React from "react";
import { useNotifications } from "../context/NotificationContext";

const iconByType = {
  success: "bi-check-circle-fill",
  error: "bi-x-circle-fill",
  warning: "bi-exclamation-triangle-fill",
  info: "bi-info-circle-fill",
};

const NotificationToasts = () => {
  const { toasts, removeToast } = useNotifications();

  return (
    <div className="notification-toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className={`notification-toast toast-${toast.type}`}>
          <div className="notification-toast-icon">
            <i className={`bi ${iconByType[toast.type] || iconByType.info}`}></i>
          </div>
          <div className="notification-toast-body">
            <p className="notification-toast-title">{toast.title}</p>
            <p className="notification-toast-text">{toast.message}</p>
          </div>
          <button
            type="button"
            className="notification-toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToasts;
