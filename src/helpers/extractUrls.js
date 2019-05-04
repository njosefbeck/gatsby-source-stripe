function extractUrls(node) {
  switch(node.object) {
    case 'product':
      return node.images;
    case 'sku':
      return [ node.image ];
    default:
      return;
  }
}

module.exports = extractUrls;
