function hasFilesToDownload(node) {
  const hasImages = node.images && node.images.length;
  const hasImage = node.image && node.image.length;
  const hasProductImages = node.product && hasFilesToDownload(node.product);
  // eslint-disable-next-line no-unneeded-ternary
  return hasImages || hasImage || hasProductImages ? true : false;
}

module.exports = hasFilesToDownload;
