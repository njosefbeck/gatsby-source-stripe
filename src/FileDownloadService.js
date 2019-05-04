const extractUrls = require('./helpers/extractUrls')
const cacheKey = require('./helpers/cacheKey');
const checkCache = require('./helpers/checkCache');
const createFileNode = require('./helpers/createFileNode')
const hasFilesToDownload = require('./helpers/hasFilesToDownload');

class FileDownloadService {
  constructor({ store, cache, createNode, createNodeId, touchNode, getNode }) {
    this.store = store;
    this.cache = cache;
    this.createNode = createNode;
    this.createNodeId = createNodeId;
    this.touchNode = touchNode;
    this.getNode = getNode;
  }

  async downloadAndAddTo(node) {
    switch(node.object) {
      case 'product':
      case 'sku':
        return this.downloadFiles(node)
        return node;
      default:
        return node;
    }
  }

  async downloadFiles(node) {
    if (!hasFilesToDownload(node)) {
      return node;
    }

    const urls = extractUrls(node);
    if (!urls) {
      return node;
    }

    const fileNodeIds = []
    for (const url of urls) {
      const cachedFileNodeId = await checkCache({
        cache: this.cache,
        getNode: this.getNode,
        touchNode: this.touchNode,
        url,
        node,
      });

      if (cachedFileNodeId) {
        fileNodeIds.push(cachedFileNodeId);
        continue;
      }

      const fileNodeId = await createFileNode({
        store: this.store,
        cache: this.cache,
        createNode: this.createNode,
        createNodeId: this.createNodeId,
        url,
        node,
      })

      if (fileNodeId) {
        fileNodeIds.push(fileNodeId)
      }
    }

    if (!fileNodeIds.length) {
      return node;
    }

    return Object.assign(node, {
      localFiles___NODE: fileNodeIds
    });
  }
}

module.exports = FileDownloadService;
