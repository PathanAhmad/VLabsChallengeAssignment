const CACHE_NAME = 'chem-supplies-v2'; // Updated cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/js/bootstrap.bundle.min.js', // Added Bootstrap JS
  '/css/all.min.css', // Updated Font Awesome CSS
  '/css/bootstrap.min.css', // Updated Bootstrap CSS
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add any other necessary files here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
