
import './App.css'
// Main Application Component

import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './app/router';
import { Toaster } from './app/components/ui/sonner';
import { notificationService } from './app/services/notifications';
import { useAuthStore } from './app/store/useAuthStore';
import { useNotificationStore } from './app/store/useNotificationStore';
import { authService } from './app/services/auth';

export default function App() {
  const { user, isAuthenticated } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    // Initialize service worker and notifications
    const initializeApp = async () => {
      // Initialize service worker
      await notificationService.initialize();

      // Initialize auth state from localStorage
      await authService.initialize();

      // Show welcome notification if authenticated
      if (isAuthenticated && user) {
        // Request notification permission
        const permission = await notificationService.requestPermission();
        
        if (permission === 'granted') {
          // Show welcome notification
          await notificationService.showNotification('Welcome to HealthCare SaaS', {
            body: `Welcome back, ${user.name}! You have a great day ahead.`,
            icon: '/favicon.ico',
          });

          // Add to notification store
          addNotification({
            title: 'Welcome Back',
            message: `Welcome back, ${user.name}!`,
            type: 'success',
          });

          // Schedule a demo notification after 10 seconds
          setTimeout(async () => {
            await notificationService.showNotification('Appointment Reminder', {
              body: 'You have an upcoming appointment in 30 minutes',
              icon: '/favicon.ico',
              tag: 'appointment-reminder',
            });

            addNotification({
              title: 'Appointment Reminder',
              message: 'You have an upcoming appointment in 30 minutes',
              type: 'info',
            });
          }, 10000);
        }
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
