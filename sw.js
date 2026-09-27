const CACHE_NAME = 'nutrizionista-emanuela-casula-v2';

const fetchAndCache = request =>
  fetch(request).then(response => {
    if (!response.ok) return response;

    const copy = response.clone();
    return caches
      .open(CACHE_NAME)
      .then(cache => cache.put(request, copy))
      .then(() => response);
  });

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['/'])));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetchAndCache(event.request).catch(async () => {
        return (await caches.match(event.request)) || caches.match('/');
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetchAndCache(event.request),
    ),
  );
});
