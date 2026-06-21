const CACHE_NAME = "iah-ai-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/icon.svg",
  "/manifest.json"
];

// Installs the background lifecycle worker and caches basic shell payloads
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[IAH ServiceWorker] Hydrating tactical asset shell caches...");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Purges obsolete caches on activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[IAH ServiceWorker] Evicting legacy code deck cache:", name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetches resource: Network-first falling back to strategic cache snapshot for static assets
self.addEventListener("fetch", (event) => {
  // Let local APIs bypass service worker caching completely
  if (event.request.url.includes("/api/")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If valid response, clone and cache newer assets dynamically
        if (response && response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fall back to cache on offline/network failures
        return caches.match(event.request);
      })
  );
});
