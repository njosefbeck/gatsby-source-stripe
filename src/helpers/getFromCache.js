function getFromCache(cache, cacheKey) {
  return cache.get(cacheKey);
}

module.exports = getFromCache;
