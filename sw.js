// install the service worker
self.addEventListener('install', (evt) => {

  console.log('[sw:install]', evt);
  self.skipWaiting();

});

// activate service worker
self.addEventListener('activate', (evt) => {

  console.log('[sw:activate]', evt);

});

// on fetch
self.addEventListener('fetch', (evt) => {

  console.log('[sw:fetch]', evt);
  evt.respondWith(fetch(evt.request));

});