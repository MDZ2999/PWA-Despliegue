const CACHE_NAME = 'pwa-practica-1-v1';
const APP_SHELL = [
	'./',
	'./index.html',
	'./detalle.html',
	'./manifest.json',
	'./css/style.css',
	'./js/app.js',
	'./img/coffee1.jpg',
	'./img/coffee2.jpg',
	'./img/coffee3.jpg',
	'./img/coffee4.jpg',
	'./img/coffee5.avif',
	'./img/coffee6.jpg',
	'./img/coffee7.avif',
	'./img/coffee8.jpg',
	'./img/coffee9.jpg',
	'./img/coffee10.webp',
	'./img/icons/icon-72x72.png',
	'./img/icons/icon-96x96.png',
	'./img/icons/icon-128x128.png',
	'./img/icons/icon-144x144.png',
	'./img/icons/icon-152x152.png',
	'./img/icons/icon-192x192.png',
	'./img/icons/icon-384x384.png',
	'./img/icons/icon-512x512.png'
];

const isCacheableResponse = (response) =>
	response && response.status === 200 && response.type !== 'opaque';

const cacheFirst = (request) => caches.match(request).then((cachedResponse) => {
	if (cachedResponse) return cachedResponse;

	return fetch(request).then((networkResponse) => {
		if (!isCacheableResponse(networkResponse)) return networkResponse;

		return caches.open(CACHE_NAME).then((cache) =>
			cache.put(request, networkResponse.clone()).then(() => networkResponse)
		);
	});
});

const networkFirst = (request) => fetch(request).then((networkResponse) => {
	if (!isCacheableResponse(networkResponse)) return networkResponse;

	return caches.open(CACHE_NAME).then((cache) =>
		cache.put(request, networkResponse.clone()).then(() => networkResponse)
	);
}).catch(() => {
	const url = new URL(request.url);
	url.search = '';

	return caches.match(url.href)
		.then((cachedResponse) => cachedResponse || caches.match('./index.html'));
});

//INSTALACION(PRECARGA DE RECURSOS ESTATICOS)
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => cache.addAll(APP_SHELL))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => Promise.all(
			cacheNames
				.filter((cacheName) => cacheName !== CACHE_NAME)
				.map((cacheName) => caches.delete(cacheName))
		)).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(event.request.mode === 'navigate'
		? networkFirst(event.request)
		: cacheFirst(event.request));
});
