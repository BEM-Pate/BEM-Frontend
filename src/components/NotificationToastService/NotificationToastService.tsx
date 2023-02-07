import {useZustand} from "../../zustand/store";
import classNames from "classnames";
import styles from './NotificationToastService.module.scss';
import {useEffect, useState} from "react";
import successIcon from "../../images/icons/modalwindow/success.svg";
import errorIcon from "../../images/icons/modalwindow/error.svg";
import warningIcon from "../../images/icons/modalwindow/warning.svg";

function getModalImage(type:string) {
  switch (type) {
    case 'success':
      return successIcon;
    case 'error':
      return errorIcon;
    case 'warning':
      return warningIcon;
    default:
      return errorIcon;
  }
}
const NotificationToastService = () => {
  const notifications = useZustand((state) => state.notifications);
  const resetNotifications = useZustand((state) => state.resetNotifications);
  const addNotification = useZustand((state) => state.addNotification);


  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => resetNotifications(), [resetNotifications]);

  useEffect(() => setToasts(notifications ?? []), [notifications]);

  return (
    <div className={classNames(styles.NotificationToastService)}>
      {toasts?.map((toast) => (
        <div className={classNames(styles.Toast)}>
          <img
            className={classNames(styles.ToastIcon)}
            src={getModalImage(toast?.type)}
            alt={toast?.type}
          />
          <span className={classNames(styles.ToastMessage)}>{toast?.message}</span>
        </div>
      ))}
    </div>
  );
}

export default NotificationToastService;
