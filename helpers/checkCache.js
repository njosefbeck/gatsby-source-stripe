"use strict";

const getFromCache = require('./getFromCache');

const cacheKey = require('./cacheKey');

const shouldUseCachedVersion = require('./shouldUseCachedVersion');

const saveNodeFromGarbageCollection = require('./saveNodeFromGarbageCollection');

async function checkCache({
  cache,
  getNode,
  touchNode,
  url,
  node
}) {
  const cachedFileData = await getFromCache(cache, cacheKey(url));

  if (shouldUseCachedVersion(cachedFileData, node)) {
    const fileNode = getNode(cachedFileData.fileNodeId);

    if (fileNode) {
      saveNodeFromGarbageCollection(touchNode, cachedFileData.fileNodeId);
      return cachedFileData.fileNodeId;
    }
  }
}

module.exports = checkCache;