"use strict";

const {
  createRemoteFileNode
} = require('gatsby-source-filesystem');

class LocalFile {
  constructor(crfnArgs) {
    this.crfnArgs = crfnArgs;
    this.fileFields = {
      product: ["images"],
      sku: ["image", "product.images"]
    };
  }

  download(payload, type) {
    this.fileFields[type.toLowerCase()].forEach(field => {
      const splitPath = field.split(".");
      let urls = this.getNestedObject(payload, splitPath);
      if (!urls || !urls.length) return;
      if (!Array.isArray(urls)) urls = [urls];
      const sourceObject = splitPath.length >= 1 ? this.getNestedObject(payload, splitPath.slice(0, -1)) : payload;
      sourceObject.localFiles___NODE = [];
      urls.forEach(async url => {
        let fileNode;

        try {
          fileNode = await createRemoteFileNode({
            url,
            ...this.crfnArgs
          });
        } catch (e) {// Ignore
        }

        if (fileNode) {
          sourceObject.localFiles___NODE.push(fileNode.id);
        }
      });
    });
  } // Access nested objects with path given as array.


  static getNestedObject(object, path) {
    path.reduce((obj, key) => obj[key], object);
  }

}

module.exports = LocalFile;