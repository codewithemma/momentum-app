import apis from "@/services/api-services";
import type { Notification } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<Notification[]> => {
      const res = await apis.notifications.getAll();
      return res.data;
    },
  });
};

export const useGetUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: async (): Promise<number> => {
      const res = await apis.notifications.getUnreadCount();
      if (typeof res.data === "number") return res.data;
      return "unreadCount" in res.data ? res.data.unreadCount : res.data.count;
    },
  });
};
