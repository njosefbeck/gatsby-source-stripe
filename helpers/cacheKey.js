"use strict";

function cacheKey(url) {
  return `stripe-file-${url}`;
}

module.exports = cacheKey;