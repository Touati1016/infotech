// اسم الكاش
const cacheName = 'v1';

// الملفات التي سيتم تخزينها مؤقتًا
const cacheAssets = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/img/logo.png',
  '/manifest.json'
];

// تثبيت Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Caching files');
        return cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// تفعيل Service Worker
self.addEventListener('activate', e => {
  console.log('Service Worker Activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// استرجاع الملفات من الكاش
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});