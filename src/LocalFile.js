const { createRemoteFileNode } = require("gatsby-source-filesystem");

class LocalFile {
  constructor(createRemoteArgs) {
    this.createRemoteArgs = createRemoteArgs;
  }

  async downloadFiles(payload, type) {
    let fileNodes;
    let fileNodesMap;

    /* Stripe objects can be expandable - i.e. they contain the ID of a related object in their
    payload, and Stripe can do some magic to make that objects' payload directly available on
    this payload. An SKU is an example of this. Both of these objects can contain files, and
    we want to keep these files seperate when querying the payloads corresponding node via
    GraphQL. To this end we return a map, where the key tells us where on the node the localFiles
    field/s should go, and the value is the corresponding file nodes */
    switch (type.toLowerCase()) {
      case "file": {
        fileNodes = await this.downloadHostedFiles(payload.url, true, payload.id, payload.type);
        fileNodesMap = { root: fileNodes };
        break;
      }
      case "product": {
        fileNodes = await this.downloadHostedFiles(payload.images, false, payload.id);
        fileNodesMap = { root: fileNodes };
        break;
      }
      case "sku": {
        const skuFileNode = await this.downloadHostedFiles(payload.image, false, payload.id);
        const skuParentProductFileNodes = await this.downloadHostedFiles(
          payload.product.images,
          false,
          payload.product.id
        );
        fileNodesMap = {
          root: skuFileNode,
          product: skuParentProductFileNodes
        };
        break;
      }
      default:
        return {};
    }

    return fileNodesMap;
  }

  /** Files can either be hosted by Stripe (e.g. an SKUs image) or elsewhere (e.g. The images
   *  used for a generic product). Files hosted on Stripe can be public or private, this means
   *  we need to support both having and not having an auth header. Obviously files hosted elsewhere
   *  can also require auth, however we don't yet support using custom auth credentials in this case.
   *  The parentNodeId field is needed so that Gatsby knows what node the newly downloaded File is 
   *  connected to. Without this, Gatsby will delete the File node when you restart the develop server 
  */
  async downloadHostedFiles(urls, useAuth, parentNodeId, type) {
    if (!urls) return;

    const urlsArray = convertToArray(urls);
    const { auth, ...createRemoteArgsWithoutAuth } = this.createRemoteArgs; // eslint-disable-line no-unused-vars
    const ext = type && `.${type}`;

    try {
      const fileNodePromises = urlsArray
        .filter(url => url)
        .map(url => {
          const createRemoteArgs = useAuth
            ? { url, parentNodeId, ext, ...this.createRemoteArgs }
            : { url, parentNodeId, ext, ...createRemoteArgsWithoutAuth };
          
          return createRemoteFileNode(createRemoteArgs);
        });
        const fileNodes = await Promise.all(fileNodePromises);
  
        return this.validateFileNodes(fileNodes);
      } catch (e) {
        const URLStrings = urlsArray.reduce(
          (URLString, url, i) => URLString + `URL ${i + 1}: ` + url + "\n",
          ""
        );
        console.log(
          "\x1b[1;31m\u2715\x1b[0m We were unable to download the following files:\n" +
            URLStrings +
            `Error: ${e.message}\n`
        );
        return null;
      }
  }

  // Accepts both a single file node and an array of file nodes
  validateFileNodes(fileNodes) {
    const fileNodesArray = convertToArray(fileNodes);
    const validFileNodes = fileNodesArray.filter(node => node);
    if (validFileNodes.length < 1)
      throw new Error("We were unable to create a valid Gatsby file node");

    return validFileNodes;
  }
}

function convertToArray(entity) {
  if (!entity) return [];
  if (!Array.isArray(entity)) return [entity];
  else return entity;
}

module.exports = LocalFile;
