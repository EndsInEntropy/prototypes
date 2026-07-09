const CACHE_NAME = 'breadboard-v1';
const ASSETS = [
  '/prototypes/Breads/',
  '/prototypes/Breads/index.html',
  '/prototypes/Breads/style.css',
  '/prototypes/Breads/db.js',
  '/prototypes/Breads/seed.js',
  '/prototypes/Breads/app.js',
  '/prototypes/Breads/manifest.json',
  '/prototypes/Breads/icon.svg',
  '/prototypes/Breads/icon-192.png',
  '/prototypes/Breads/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(resp => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
