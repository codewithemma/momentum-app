"use client";

import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "@/hooks/mutate/use-notifications";
import { useGetNotifications, useGetUnreadNotificationCount } from "@/hooks/query/use-notifications";
import { toast } from "@/components/ui/toast";
import { routes } from "@/libs/routes";
import { formatDistanceToNow } from "date-fns";
import { Bell, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function NotificationBell() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { data: notifications = [], isLoading, isError } = useGetNotifications();
  const { data: unreadCount = 0 } = useGetUnreadNotificationCount();
  const markRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsAsRead();

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function handleNotificationClick(notification: (typeof notifications)[number]) {
    if (!notification.read) {
      markRead.mutate(notification.id, {
        onError: () => {
          toast({
            variant: "error",
            message: "Unable to mark notification as read.",
          });
        },
      });
    }
    setOpen(false);
    if (notification.leadId) router.push(routes.leads.leadById(notification.leadId));
  }

  function handleMarkAllRead() {
    markAllRead.mutate(undefined, {
      onError: () => {
        toast({
          variant: "error",
          message: "Unable to mark notifications as read.",
        });
      },
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="relative inline-flex size-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
      >
        <Bell className="size-4" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex min-w-3.5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 px-1 text-[9px] font-semibold leading-3 text-gray-950 ring-2 ring-white dark:bg-gray-100 dark:ring-gray-950">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 max-w-[calc(100vw-2rem)] overflow-hidden border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-950 dark:text-gray-100">Notifications</h2>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={markAllRead.isPending}
                className="text-xs text-gray-500 transition-colors hover:text-gray-950 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {markAllRead.isPending ? "Marking..." : "Mark all as read"}
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-xs text-gray-500">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading notifications
              </div>
            ) : isError ? (
              <p className="px-4 py-10 text-center text-sm text-gray-500">Unable to load notifications.</p>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <Check className="size-4 text-gray-500" aria-hidden="true" />
                <p className="text-sm text-gray-500">You&apos;re all caught up.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex w-full gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-gray-50 dark:border-gray-900 dark:hover:bg-gray-900 ${notification.read ? "" : "bg-gray-50 dark:bg-gray-900/60"}`}
                >
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${notification.read ? "bg-transparent" : "bg-gray-950 dark:bg-gray-100"}`} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-gray-950 dark:text-gray-100">{notification.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-500 dark:text-gray-400">{notification.message}</span>
                    <span className="mt-2 block text-[10px] text-gray-400 dark:text-gray-600">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
