importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
);

const modelFiles = [
  "/static/model-tfjs/model.json?v=1.1.0",
  "/static/model-tfjs/group1-shard1of4.bin?v=1.1.0",
  "/static/model-tfjs/group1-shard2of4.bin?v=1.1.0",
  "/static/model-tfjs/group1-shard3of4.bin?v=1.1.0",
  "/static/model-tfjs/group1-shard4of4.bin?v=1.1.0",
  // Add more files if necessary
];

workbox.precaching.precacheAndRoute(modelFiles);

workbox.routing.registerRoute(
  ({ url }) => url.pathname.endsWith(".json") || url.pathname.endsWith(".bin"),
  new workbox.strategies.NetworkFirst()
);
