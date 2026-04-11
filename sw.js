var CACHE_VERSION = 'uw-amenities-v1';

var PRECACHE_URLS = [
    './',
    './index.html',
    './css/style.css',
    './js/config.js',
    './js/util.js',
    './js/popup.js',
    './js/map.js',
    './js/data.js',
    './js/buildings.js',
    './js/filter.js',
    './js/search.js',
    './js/geolocation.js',
    './js/main.js',
    './lib/jquery-3.5.1.js',
    './data/buildings.geojson',
    './manifest.json'
];

// Install: pre-cache local assets
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function (cache) {
            return cache.addAll(PRECACHE_URLS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

// Activate: delete old caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (name) {
                    return name !== CACHE_VERSION;
                }).map(function (name) {
                    return caches.delete(name);
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// Fetch: routing strategy
self.addEventListener('fetch', function (event) {
    var url = new URL(event.request.url);

    // Map tiles — network-first, cache fallback
    if (url.hostname.indexOf('basemaps.cartocdn.com') !== -1) {
        event.respondWith(networkFirstThenCache(event.request));
        return;
    }

    // Navigation — network-first, cache fallback
    if (event.request.mode === 'navigate') {
        event.respondWith(networkFirstThenCache(event.request));
        return;
    }

    // Everything else — cache-first, network fallback
    event.respondWith(cacheFirstThenNetwork(event.request));
});

function cacheFirstThenNetwork(request) {
    return caches.match(request).then(function (cached) {
        if (cached) {
            return cached;
        }
        return fetch(request).then(function (response) {
            if (response && response.status === 200) {
                var responseClone = response.clone();
                caches.open(CACHE_VERSION).then(function (cache) {
                    cache.put(request, responseClone);
                });
            }
            return response;
        });
    });
}

function networkFirstThenCache(request) {
    return fetch(request).then(function (response) {
        if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(CACHE_VERSION).then(function (cache) {
                cache.put(request, responseClone);
            });
        }
        return response;
    }).catch(function () {
        return caches.match(request);
    });
}
