import { useState, useEffect } from 'react';

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true
  });

  useEffect(() => {
    if ('Notification' in window) {
      const currentPermission = Notification.permission;
      setPermission({
        granted: currentPermission === 'granted',
        denied: currentPermission === 'denied',
        default: currentPermission === 'default'
      });
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission({
        granted: result === 'granted',
        denied: result === 'denied',
        default: result === 'default'
      });
      return result;
    }
    return 'denied';
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission.granted && 'Notification' in window) {
      return new Notification(title, {
        icon: '/agri.png',
        badge: '/agri.png',
        ...options
      });
    }
    return null;
  };

  const showWeatherAlert = (condition: string, message: string) => {
    return showNotification(`Weather Alert: ${condition}`, {
      body: message,
      tag: 'weather',
      requireInteraction: true
    });
  };

  const showMarketAlert = (crop: string, change: string) => {
    return showNotification(`Market Update: ${crop}`, {
      body: `Price change: ${change}`,
      tag: 'market'
    });
  };

  const showSeasonalReminder = (task: string, message: string) => {
    return showNotification(`Farming Reminder: ${task}`, {
      body: message,
      tag: 'seasonal'
    });
  };

  const showDiseaseAlert = (disease: string, message: string) => {
    return showNotification(`Disease Alert: ${disease}`, {
      body: message,
      tag: 'disease',
      requireInteraction: true
    });
  };

  return {
    permission,
    requestPermission,
    showNotification,
    showWeatherAlert,
    showMarketAlert,
    showSeasonalReminder,
    showDiseaseAlert
  };
};