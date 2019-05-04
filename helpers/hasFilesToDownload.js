"use strict";

function hasFilesToDownload(node) {
  const hasImages = node.images && node.images.length;
  const hasImage = node.image && node.image.length;
  return hasImages || hasImage;
}

module.exports = hasFilesToDownload;