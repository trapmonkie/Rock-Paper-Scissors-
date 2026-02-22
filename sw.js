const CACHE_NAME = 'rps-v13';
const ASSETS = [
  '/',
  '/index.html',
  '/images/black-rock-rps.PNG',
  '/images/black-paper-rps.PNG',
  '/images/black-scissors-rps.PNG',
  '/images/white-rock-rps.PNG',
  '/images/white-paper-rps.PNG',
  '/images/white-scissors-rps.PNG',
  'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() =>
      // If both cache and network fail (e.g. PeerJS offline), return empty response
      new Response('', { status: 503 })
    ))
  );
});
