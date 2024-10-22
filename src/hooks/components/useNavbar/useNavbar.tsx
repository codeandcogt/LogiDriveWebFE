import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  link?: string
}

export const useNavbar = () => {
  const navigation = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([])

  const handleLogOut = () => {
    navigation("/");
  };

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      markAsRead(notification.id)
      navigation(notification.link)
    }
  }

  return { handleLogOut, handleNotificationClick, deleteNotification, unreadCount, notifications, markAsRead};
};
