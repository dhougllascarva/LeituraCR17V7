
const CACHE_NAME = 'tellus-v9999';

self.addEventListener('fetch', event => {

  event.respondWith(

    fetch(event.request)
      .catch(() => caches.match(event.request))

  );

});
