const hasFilesToDownload = require("./hasFilesToDownload");

function extractSkuUrls(node) {
  let urls = [];
  if (node.image && node.image.length) {
    urls = [{ location: "root", url: node.image }];
  }

  if (hasFilesToDownload(node.product)) {
    node.product.images.forEach(url => {
      urls.push({ location: "product", url });
    });
  }
  return urls;
}

module.exports = extractSkuUrls;
