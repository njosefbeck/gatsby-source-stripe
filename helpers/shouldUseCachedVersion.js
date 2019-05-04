"use strict";

function shouldUseCachedVersion(cachedData, node) {
  return cachedData && node.updated === cachedData.updated;
}

module.exports = shouldUseCachedVersion;