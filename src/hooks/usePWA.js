import { useState, useEffect } from 'react';

export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swRegistered, setSwRegistered] = useState(false);

  // Vérifier statut en ligne/hors ligne
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

  // Enregistrer Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('[PWA] Service Worker enregistré avec succès');
            setSwRegistered(true);
          })
          .catch(error => {
            console.log('[PWA] Échec enregistrement Service Worker:', error);
          });
      });
    }
  }, []);

  // Écouter événement beforeinstallprompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Vérifier si déjà installé
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }, []);

  // Installer l'app
  const install = async () => {
    if (!deferredPrompt) {
      console.log('[PWA] Installation non disponible');
      return false;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] Installation acceptée');
      setIsInstalled(true);
    } else {
      console.log('[PWA] Installation refusée');
    }
    
    setDeferredPrompt(null);
    return outcome === 'accepted';
  };

  // Demander permission notifications
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('[PWA] Notifications non supportées');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };

  // Envoyer notification
  const sendNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/vite.svg',
        badge: '/vite.svg',
        ...options
      });
    }
  };

  // Synchroniser données (background sync)
  const syncData = async () => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      try {
        await registration.sync.register('sync-data');
        console.log('[PWA] Sync enregistrée');
      } catch (err) {
        console.log('[PWA] Sync échouée:', err);
      }
    }
  };

  // Vider le cache
  const clearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('[PWA] Cache vidé');
    }
  };

  return {
    isInstalled,
    isOnline,
    swRegistered,
    install,
    requestNotificationPermission,
    sendNotification,
    syncData,
    clearCache
  };
}

export default usePWA;
