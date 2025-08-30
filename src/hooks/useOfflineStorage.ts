import { useState, useEffect } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export const useOfflineStorage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setCache = <T>(key: string, data: T, expiryHours = 24) => {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + (expiryHours * 60 * 60 * 1000)
    };
    localStorage.setItem(`agrisenti_${key}`, JSON.stringify(item));
  };

  const getCache = <T>(key: string): T | null => {
    const item = localStorage.getItem(`agrisenti_${key}`);
    if (!item) return null;

    try {
      const cached: CacheItem<T> = JSON.parse(item);
      if (Date.now() > cached.expiry) {
        localStorage.removeItem(`agrisenti_${key}`);
        return null;
      }
      return cached.data;
    } catch {
      return null;
    }
  };

  const clearExpiredCache = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('agrisenti_'));
    keys.forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const cached = JSON.parse(item);
          if (Date.now() > cached.expiry) {
            localStorage.removeItem(key);
          }
        } catch {
          localStorage.removeItem(key);
        }
      }
    });
  };

  return { isOnline, setCache, getCache, clearExpiredCache };
};