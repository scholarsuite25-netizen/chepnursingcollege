/**
 * CHEP College of Nursing Sciences - Service Worker & Push Notification Handler
 * Provides offline shell caching, background sync, and system notifications for
 * CAOSCE station rotation countdowns, Code Blue trauma alerts, and admissions dispatches.
 */

const CACHE_NAME = 'chep-nursing-pwa-v1';
const STATIC_ASSETS = [
  '/',
  '/exams',
  '/admission',
  '/clinical-reflections',
  '/portal',
  '/images/chep/chep_logo.png',
  '/manifest.json'
];

// Install: Cache critical institutional assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[CHEP PWA] Non-fatal asset caching warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network first, falling back to cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip API routes and non-origin requests from cache-first strategy
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
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
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }
          return new Response('Network offline. CHEP College PWA cache active.', {
            status: 503,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// Push Event: Handle background push notifications sent from server or push service
self.addEventListener('push', (event) => {
  let data = {
    title: 'CHEP College Academic Notification',
    body: 'New update from CHEP College of Nursing Sciences.',
    url: '/exams',
    tag: 'chep-academic-alert',
    icon: '/images/chep/chep_logo.png'
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
    icon: data.icon || '/images/chep/chep_logo.png',
    badge: '/images/chep/chep_logo.png',
    vibrate: [200, 100, 200, 100, 300],
    tag: data.tag || 'chep-notification',
    renotify: true,
    data: {
      url: data.url || '/'
    },
    actions: [
      { action: 'open_url', title: 'Open Notification' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click: Navigate to target clinical station or portal page
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
