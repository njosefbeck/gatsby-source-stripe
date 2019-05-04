"use strict";

async function saveToCache(cache, cacheKey, value) {
  await cache.set(cacheKey, value);
}

module.exports = saveToCache;