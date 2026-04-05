// Service Worker and Notification Service

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[];
  actions?: NotificationAction[];
  
}

export class NotificationService {
  private static instance: NotificationService;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Initialize service worker
  async initialize(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Request notification permission
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  // Show local notification
  async showNotification(
    title: string,
    options?: ExtendedNotificationOptions
  ): Promise<void> {
    const permission = await this.requestPermission();

    if (permission === 'granted') {
      if (this.registration) {
        // Use service worker notification
        await this.registration.showNotification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options,
        });
      } else {
        // Fallback to regular notification
        new Notification(title, {
          icon: '/favicon.ico',
          ...options,
        });
      }
    }
  }

  // Schedule a notification (simulated)
  async scheduleNotification(
    title: string,
    options: NotificationOptions,
    delayMs: number
  ): Promise<void> {
    setTimeout(() => {
      this.showNotification(title, options);
    }, delayMs);
  }

  // Show appointment reminder
  async showAppointmentReminder(patientName: string, time: string): Promise<void> {
    await this.showNotification('Upcoming Appointment', {
      body: `Reminder: ${patientName} has an appointment at ${time}`,
      tag: 'appointment-reminder',
      requireInteraction: true,
      actions: [
        { action: 'view', title: 'View Details' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    });
  }

  // Show critical patient alert
  async showCriticalAlert(patientName: string, message: string): Promise<void> {
    await this.showNotification('⚠️ Critical Patient Alert', {
      body: `${patientName}: ${message}`,
      tag: 'critical-alert',
      requireInteraction: true,
      vibrate: [200, 100, 200],
    });
  }

  // Show new patient notification
  async showNewPatientNotification(patientName: string): Promise<void> {
    await this.showNotification('New Patient Registered', {
      body: `${patientName} has been successfully registered in the system`,
      tag: 'new-patient',
    });
  }

  // Check if notifications are supported and enabled
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  // Get current permission status
  getPermissionStatus(): NotificationPermission {
    return Notification.permission;
  }
}

export const notificationService = NotificationService.getInstance();
