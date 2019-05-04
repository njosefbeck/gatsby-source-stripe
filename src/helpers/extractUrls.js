const hasFilesToDownload = require('./hasFilesToDownload');

function extractUrls(node) {
  switch(node.object) {
    case 'product':
      return node.images.map(url => ({ location: 'root', url }))
    case 'sku':
      const urls = [ { location: 'root', url: node.image } ];
      if (hasFilesToDownload(node.product)) {
        node.product.images.forEach(url => {
          urls.push({ location: 'product', url })
        })
      }
      return urls;
    default:
      return;
  }
}

module.exports = extractUrls;
