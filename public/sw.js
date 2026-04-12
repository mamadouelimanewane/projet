// Service Worker pour Projet Élite - PWA
const CACHE_NAME = 'projet-elite-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Service Worker installé');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Service Worker activé');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie de cache : Network First pour API, Cache First pour static
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Ne pas mettre en cache les requêtes API
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('http')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache First pour les ressources statiques
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'image' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          return cached;
        }
        return fetch(request).then(response => {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Network First pour les pages HTML
  event.respondWith(
    fetch(request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          return cached || caches.match('/index.html');
        });
      })
  );
});

// Push Notifications
self.addEventListener('push', event => {
  console.log('[SW] Push notification reçu');
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Projet Élite';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/vite.svg',
    badge: '/vite.svg',
    data: data.url || '/',
    actions: [
      { action: 'view', title: 'Voir', icon: '/vite.svg' },
      { action: 'close', title: 'Fermer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Click sur notification
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        for (let client of windowClients) {
          if (client.url.includes(event.notification.data) && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(event.notification.data);
      })
    );
  }
});

// Background Sync (synchronisation en arrière-plan)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Sync en arrière-plan');
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Synchroniser les données locales avec le serveur
  return fetch('/api/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).catch(err => {
    console.log('[SW] Sync échouée, réessaiera plus tard');
  });
}

// Message du client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => {
      keys.forEach(key => caches.delete(key));
    });
  }
});
