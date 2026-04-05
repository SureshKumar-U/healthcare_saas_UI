// Notification Demo Component - Shows notification capabilities

import  { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { notificationService } from '../../services/notifications';
import { useNotificationStore } from '../../store/useNotificationStore';
import { toast } from 'sonner';

const NotificationDemo = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    notificationService.getPermissionStatus()
  );
  const { addNotification } = useNotificationStore();

  const requestPermission = async () => {
    const permission = await notificationService.requestPermission();
    setPermissionStatus(permission);
    
    if (permission === 'granted') {
      toast.success('Notification permission granted!');
    } else {
      toast.error('Notification permission denied');
    }
  };

  const showAppointmentNotification = async () => {
    await notificationService.showAppointmentReminder('John Smith', '3:00 PM');
    addNotification({
      title: 'Appointment Reminder',
      message: 'John Smith has an appointment at 3:00 PM',
      type: 'info',
    });
    toast.info('Appointment reminder sent');
  };

  const showCriticalAlert = async () => {
    await notificationService.showCriticalAlert('Jane Doe', 'Immediate attention required');
    addNotification({
      title: 'Critical Patient Alert',
      message: 'Jane Doe: Immediate attention required',
      type: 'error',
    });
    toast.error('Critical alert sent');
  };

  const showNewPatientNotification = async () => {
    await notificationService.showNewPatientNotification('Michael Johnson');
    addNotification({
      title: 'New Patient Registered',
      message: 'Michael Johnson has been successfully registered',
      type: 'success',
    });
    toast.success('New patient notification sent');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Service Demo
        </CardTitle>
        <CardDescription>
          Test push notifications and service worker functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notification Permission</p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium capitalize">{permissionStatus}</span>
              </p>
            </div>
            {permissionStatus !== 'granted' && (
              <Button onClick={requestPermission} size="sm">
                Enable Notifications
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex flex-col h-auto p-4 items-start"
            onClick={showAppointmentNotification}
            disabled={permissionStatus !== 'granted'}
          >
            <Info className="w-5 h-5 text-blue-600 mb-2" />
            <span className="font-medium">Appointment</span>
            <span className="text-xs text-gray-500">Show reminder</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-auto p-4 items-start"
            onClick={showCriticalAlert}
            disabled={permissionStatus !== 'granted'}
          >
            <AlertCircle className="w-5 h-5 text-red-600 mb-2" />
            <span className="font-medium">Critical Alert</span>
            <span className="text-xs text-gray-500">Urgent notification</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-auto p-4 items-start"
            onClick={showNewPatientNotification}
            disabled={permissionStatus !== 'granted'}
          >
            <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
            <span className="font-medium">New Patient</span>
            <span className="text-xs text-gray-500">Registration notice</span>
          </Button>
        </div>

        {permissionStatus !== 'granted' && (
          <p className="text-sm text-gray-500 text-center pt-2">
            Enable notifications to test the service worker functionality
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationDemo;