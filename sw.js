
const CACHE_NAME = 'tellus-v11000';

const urlsToCache = [

  './',
  './index.html',
  './manifest.json',
  './indexes.json',

  './171_1.json',
  './171_2.json',

  './172.json',

  './173_1.json',
  './173_2.json',

  './174.json',
  './175.json',
  './176.json',

  './launchericon-192x192.png',
  './launchericon-512x512.png'

];


// ======================================
// INSTALL
// ======================================

self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});


// ======================================
// FETCH
// ======================================

self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        return response || fetch(event.request)
          .then(networkResponse => {

            // ==================================
            // CACHE DOS MAPAS
            // ==================================

            if(
              event.request.url.includes(
                'tile.openstreetmap.org'
              )
            ){

              caches.open(CACHE_NAME)
                .then(cache => {

                  cache.put(
                    event.request,
                    networkResponse.clone()
                  );

                });

            }

            return networkResponse;

          });

      })

  );

});
