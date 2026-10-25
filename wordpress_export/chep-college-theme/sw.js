/**
 * CHEP College of Nursing Sciences - WordPress PWA Service Worker
 * Handles offline shell caching, push notifications, and background exam bells.
 */

const CACHE_NAME = 'chep-wp-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Network-first with offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip wp-admin and wp-login.php
  if (url.pathname.includes('/wp-admin') || url.pathname.includes('wp-login.php')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          return caches.match('/');
        });
      })
  );
});

// Push Event: Background push notifications
self.addEventListener('push', (event) => {
  let data = {
    title: 'CHEP College Academic Notification',
    body: 'New update from CHEP College of Nursing Sciences.',
    url: '/',
    tag: 'chep-notification'
  };

  if (event.data) {
    try {
      data = Object.assign(data, event.data.json());
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || 'assets/images/chep_logo.png',
    badge: 'assets/images/chep_logo.png',
    vibrate: [200, 100, 200, 100, 300],
    tag: data.tag || 'chep-alert',
    renotify: true,
    data: {
      url: data.url || '/'
    },
    actions: [
      { action: 'open_url', title: 'Open' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
