"use strict";

const {
  createRemoteFileNode
} = require('gatsby-source-filesystem');

class LocalFile {
  constructor(createRemoteArgs) {
    this.createRemoteArgs = createRemoteArgs;
    this.fileFields = {
      product: ["images"],
      sku: ["image", "product.images"],
      file: ["url"]
    };
  }

  downloadFiles(payload, type) {
    if (type === "File") return downloadFileNode(payload);
    const fields = this.fileFields[type.toLowerCase()];
    if (!fields) return payload;
    fields.forEach(field => {
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
            ...this.createRemoteArgs
          });
        } catch (e) {
          console.log(e);
        }

        if (fileNode) {
          sourceObject.localFiles___NODE.push(fileNode.id);
        }
      });
    });
    return payload;
  }

  async downloadFileNode(payload) {
    const updatedData = payload.data.map(async file => {
      let fileNode;

      try {
        fileNode = await createRemoteFileNode({
          url: file.url,
          ext: `.${file.type}`,
          ...this.createRemoteArgs
        });
      } catch (e) {
        console.log(e);
      }

      if (fileNode) {
        file.localFiles___NODE = [fileNode.id];
      }

      return file;
    });
    payload.data = await Promise.all(updatedData);
    return payload;
  } // Access nested objects with path given as array.


  getNestedObject(object, path) {
    return path.reduce((obj, key) => obj[key], object);
  }

}

module.exports = LocalFile;