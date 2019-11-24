const { createRemoteFileNode } = require("gatsby-source-filesystem");
const cacheKey = require("./cacheKey");
const saveToCache = require("./saveToCache");

async function createFileNode({
  store,
  cache,
  createNode,
  createNodeId,
  url,
  node
}) {
  try {
    const fileNode = await createRemoteFileNode({
      url,
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId
    });

    if (fileNode) {
      await saveToCache(cache, cacheKey(url), {
        fileNodeId: fileNode.id,
        updated: node.updated
      });
      return fileNode.id;
    }
  } catch (e) {
    console.error(`${e}\nSkipping...`);
  }
}

module.exports = createFileNode;
