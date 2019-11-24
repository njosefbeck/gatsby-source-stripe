function hasFilesToDownload(node) {
  const hasImages = node.images && node.images.length;
  const hasImage = node.image && node.image.length;
  const hasProductImages = node.product && hasFilesToDownload(node.product);
  return hasImages || hasImage || hasProductImages;
}

module.exports = hasFilesToDownload;
