const { createRemoteFileNode } = require('gatsby-source-filesystem')

class LocalFile {
  constructor(createRemoteArgs) {
    this.createRemoteArgs = createRemoteArgs;
  }

  async downloadFiles(payload, type, auth) {
    let fileNodes;
    let fileNodesMap;
    let fileURLs;

    /* Stripe objects can be expandable - i.e. they contain the ID of a related object in their
    payload, and Stripe can do some magic to make that objects' payload directly available on 
    this payload. An SKU is an example of this. Both of these objects can contain files, and 
    we want to keep these files seperate when querying the payloads corresponding node via 
    GraphQL. As a result fileNodes have an associated key because we need to tell us where on 
    the node the localFiles field/s should go */
    switch(type.toLowerCase()) {
      case "file":
        fileURLs = this.convertToArray(payload.url);
        fileNodes = await this.downloadStripeHostedFile(fileURLs, payload.type);
        fileNodesMap = { root: fileNodes };
        break;
      case "product":
        fileURLs = this.convertToArray(payload["images"]);
        fileNodes = await this.downloadRemoteHostedFile(fileURLs, auth);
        fileNodesMap = { root: fileNodes };
        break;
      case "skus":
        const skuFileUrls = this.convertToArray(payload["image"]);
        const skuParentProductFileUrls = this.convertToArray(payload["product"]["images"]);
        const [skuFileNodes, skuParentProductFileNodes] = await Promise.all(
            this.downloadRemoteHostedFile(skuFileUrls, auth),
            this.downloadRemoteHostedFile(skuParentProductFileUrls, auth)
        )
        fileNodesMap = { root: skuFileNodes, product: skuParentProductFileNodes };
        break;
      default:
        return {};
    }

    return fileNodesMap;
  }

  convertToArray(urls) {
    if (!urls || !urls.length) return [];
    if (!Array.isArray(urls)) return [urls];
    else return urls;
  }

  /* Product and SKU type payloads can have images but they can't currently be hosted on Stripe
  Since these images can be hosted anywhere the developer has the option to specify the auth flag 
  which will add or remove the Authorization HTTP header sent when fetching the images. */
  async downloadRemoteHostedFile(urls, authFlag) {
    try {
      const { auth, ...createRemoteArgsWithoutAuth } = this.createRemoteArgs;

      const fileNodePromises = urls.map(url => {
        const createRemoteArgs = authFlag ? { url, ...this.createRemoteArgs } : { url, ...createRemoteArgsWithoutAuth };
        return createRemoteFileNode(createRemoteArgs);
      });
      const fileNodes = await Promise.all(fileNodePromises);
      const validFileNodes = fileNodes.filter(node => node);
      if (validFileNodes.length < 1) throw new Error("Failed to process remote content");
    
      return validFileNodes;
    } catch (e) {
      console.log("We were unable to download images that stripe was pointing at, the following error occured:", e);
      return null;
    }
  }

  // File types objects have images that are hosted on Stripes servers.
  async downloadStripeHostedFile(urls, type) {
    try {
      const fileNodePromises = urls.map(url => createRemoteFileNode({ url, ext: `.${type}`,...this.createRemoteArgs }));
      const fileNodes = await Promise.all(fileNodePromises);
      const validFileNodes = fileNodes.filter(node => node);
      if (validFileNodes.length < 1) throw new Error("Failed to process remote content");
    
      return validFileNodes;
    } catch (e) {
      console.log("We were unable to download images that stripe was hosting, the following error occured:", e);
      return null;
    }
  }
}

module.exports = LocalFile;