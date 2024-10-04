const cacheName = 'DesainWeb-Sherly-cache';
const filesToCache = [
  '/',
  '/index.html',
  '/contact.html',
  '/about.html',
  '/offline.html',
  '/manifest.json',
  'css/style.css',
  'css/style2.css',
  'css/style3.css',
  'icon/heart.png'
];

// Install Service Worker dan cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(filesToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Jika file ada di cache, ambil dari cache
                }
                return fetch(event.request).catch(() => {
                    // Jika fetch gagal (misalnya, saat offline), tampilkan offline.html
                    return caches.match('/offline.html');
                });
            })
    );
});

// Aktivasi Service Worker dan hapus cache yang tidak digunakan
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Hapus cache yang tidak digunakan
                    }
                })
            );
        })
    );
});
