import { ProfileData } from "@/interface/IComponents/navbar";
import { get } from "@/services";
import { useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export const useNavbar = () => {
  const navigation = useNavigate();
  const { session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [modalProfile, setModalProfile] = useState<boolean>(false);

  const handleLogOut = () => {
    navigation("/");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      markAsRead(notification.id);
      navigation(notification.link);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await get<ProfileData>(`api/AppUser/${session?.nameidentifier}`, session?.token);

      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isLoading, error, isError } = useQuery<ProfileData, Error>({
    queryKey: ["api-AppUser"],
    queryFn: fetchProfile,
    staleTime: 5000,
  });

  return {
    handleLogOut,
    handleNotificationClick,
    deleteNotification,
    unreadCount,
    notifications,
    markAsRead,
    modalProfile,
    setModalProfile,
    data,
    isLoading,
    isError,
    error,
  };
};
