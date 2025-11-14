const CACHE_NAME = "Cache";
const urlsToCache = [
  "/index.html",
  "/Project.html",
  "/style.css",
  "/script.js"
];

// Installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Active immédiatement ce service worker
});

// Activation : delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name); // Delete old caches
          }
        })
      );
    })
  );
  self.clients.claim(); // Takes control of pages immediately
});

// Interception of requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If found in cache, return the file
      if (response) return response;
      // Otherwise, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Update the cache with the new resource
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
