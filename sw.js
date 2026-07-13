var CACHE = 'ah-v3';
var APP_SHELL = [
  './',
  'index.html',
  'accueil.html',
  'jeu-alphabet.html',
  'jeu-anagramme.html',
  'jeu-apparier.html',
  'jeu-cherche-clique.html',
  'jeu-classement.html',
  'jeu-demeler.html',
  'jeu-mots-croises.html',
  'jeu-mots-meles.html',
  'jeu-paire.html',
  'jeu-pendu.html',
  'jeu-quiz.html',
  'jeu-vrai-faux.html',
  'css/site.css',
  'css/platform.css',
  'js/score.js',
  'js/platform.js',
  'js/shared.js',
  'js/automation.js',
  'assets/logo.png',
  'assets/fonts/open-sans-latin.woff2',
  'assets/fonts/open-sans-latin-ext.woff2'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(APP_SHELL);
    }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(res) {
      if (res.ok) {
        var clone = res.clone();
        caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
      }
      return res;
    }).catch(function() {
      return caches.match(e.request).then(function(cached) {
        return cached || new Response('Hors ligne', { status: 503 });
      });
    })
  );
});
