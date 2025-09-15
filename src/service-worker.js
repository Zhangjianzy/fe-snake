// 缓存名称和版本
const CACHE_NAME = 'snake-game-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/src/App.css',
  '/public/vite.svg',
  '/public/manifest.json'
];

// 安装阶段：缓存所有关键资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS);
      })
      .then(() => {
        // 跳过等待，立即激活新的service worker
        return self.skipWaiting();
      })
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 立即获取控制权
  return self.clients.claim();
});

// 拦截请求，优先从缓存提供资源
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中则返回缓存的资源
        if (response) {
          return response;
        }
        // 缓存未命中则发起网络请求
        return fetch(event.request).catch(() => {
          // 网络请求失败时，可以返回一个备用页面
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});