const CACHE_NAME = 'recipe-box-v1';
const ASSETS = [
  '/prototypes/Recipes/',
  '/prototypes/Recipes/index.html',
  '/prototypes/Recipes/recipe.html',
  '/prototypes/Recipes/style.css',
  '/prototypes/Recipes/app.js',
  '/prototypes/Recipes/data.js',
  '/prototypes/Recipes/manifest.json',
  '/prototypes/Recipes/icon.svg',
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
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(resp => {
        if(resp && resp.ok){
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
