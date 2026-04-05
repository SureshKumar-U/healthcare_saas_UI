// Notification state management using Zustand

import { create } from "zustand";
import type { NotificationState } from "../types";

export const useNotificationStore = create<NotificationState>(
  (set) => ({
    notifications: [],
    unreadCount: 0,

    addNotification: (notification) =>
      set((state) => {
        const newNotification = {
          ...notification,
          id: `notif-${Date.now()}-${Math.random()}`,
          timestamp: new Date().toISOString(),
          read: false,
        };
        return {
          notifications: [
            newNotification,
            ...state.notifications,
          ],
          unreadCount: state.unreadCount + 1,
        };
      }),

    markAsRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n,
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          read: true,
        })),
        unreadCount: 0,
      })),

    clearNotifications: () =>
      set({ notifications: [], unreadCount: 0 }),
  }),
);