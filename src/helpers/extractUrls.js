const extractChildUrls = require("./extractChildUrls");

function extractUrls(node) {
  switch (node.object) {
    case "product":
      return node.images.map((url) => ({ location: "root", url }));
    case "sku":
    case "price":
      return extractChildUrls(node);
    default:
      return [];
  }
}

module.exports = extractUrls;
