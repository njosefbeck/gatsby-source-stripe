"use strict";

const {
  createRemoteFileNode
} = require('gatsby-source-filesystem');

class LocalFile {
  constructor(createRemoteArgs) {
    this.createRemoteArgs = createRemoteArgs;
  }

  async downloadFiles(payload, type, auth) {
    let fileNodes;

    switch(type.toLowerCase()) {
      case "file":
        const fileURLs = payload.links.data.map(({ url }) => url);
        fileNodes = await this.downloadStripeHostedFile(fileURLs);
        break;
      case "product":
        const fileURLs = [...payload["images"]];
        fileNodes = await this.downloadRemoteHostedFile(fileURLs, auth);
        break;
      case "skus":
        const fileURLs = [...payload["image"], ...payload["product"]["images"]];
        fileNodes = await this.downloadRemoteHostedFile(fileURLs, auth);
        break;
      default:
        return [];
    }

    return fileNodes;
  }

  /* Product and SKU type payloads can have images but they can't currently be hosted on Stripe
  Since these images can be hosted anywhere the developer has the option to specify the auth options
  which will affect the content of the Authorization HTTP header sent when fetching the images. */
  async downloadRemoteHostedFile(urls, auth) {
    try {
      const fileNodePromises = urls.map(url => createRemoteFileNode({ url, ...this.createRemoteArgs, auth }));
      const fileNodes = Promise.all(fileNodePromises);
    
      return fileNodes;
    } catch (e) {
      console.log("We were unable to download images that stripe was pointing at, the following error occured:", e);
      return null;
    }
  }

  // File types objects have images that are hosted on Stripes servers
  async downloadStripeHostedFile(urls) {
    try {
      const fileNodePromises = urls.map(url => createRemoteFileNode({ url, ext: `.${file.type}`,...this.createRemoteArgs }));
      const fileNodes = Promise.all(fileNodePromises);
    
      return fileNodes;
    } catch (e) {
      console.log("We were unable to download images that stripe was hosting, the following error occured:", e);
      return null;
    }
  }
}

module.exports = LocalFile;