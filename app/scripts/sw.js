// importScripts('/cache-polyfill.js');
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('crowdevelop').then(function(cache) {
            return cache.addAll([
                '/',
                '../index.html',
                '../styles/css/app.css',
                '/scripts/main.min.js'
            ]);
        })
    );
});
