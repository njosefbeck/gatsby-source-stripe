const extractUrls = require('./helpers/extractUrls');
const checkCache = require('./helpers/checkCache');
const createFileNode = require('./helpers/createFileNode')
const hasFilesToDownload = require('./helpers/hasFilesToDownload');
const addLocalFiles = require('./helpers/addLocalFiles');

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
      case 'price':
        return this.downloadFiles(node);
      default:
        return node;
    }
  }

  async downloadFiles(node) {
    if (!hasFilesToDownload(node)) {
      return node;
    }

    const urls = extractUrls(node);
    if (!urls.length) {
      return node;
    }

    const fileNodeIds = []

    for (const url of urls) {
      const cachedFileNodeId = await checkCache({
        cache: this.cache,
        getNode: this.getNode,
        touchNode: this.touchNode,
        url: url.url,
        node,
      });

      if (cachedFileNodeId) {
        fileNodeIds.push({ location: url.location, id: cachedFileNodeId });
        continue;
      }

      const fileNodeId = await createFileNode({
        store: this.store,
        cache: this.cache,
        createNode: this.createNode,
        createNodeId: this.createNodeId,
        url: url.url,
        node,
      })

      if (fileNodeId) {
        fileNodeIds.push({ location: url.location, id: fileNodeId })
      }
    }

    if (!fileNodeIds.length) {
      return node;
    }

    const nodeWithLocalFiles = addLocalFiles(node, fileNodeIds)
    return nodeWithLocalFiles;
  }
}

module.exports = FileDownloadService;
