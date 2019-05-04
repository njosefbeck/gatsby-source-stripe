async function getFromCache(cache, cacheKey) {
  return await cache.get(cacheKey);
}

module.exports = getFromCache;
