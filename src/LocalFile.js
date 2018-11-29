const { createRemoteFileNode } = require('gatsby-source-filesystem');

class LocalFile {
  constructor(createRemoteArgs) {
    this.createRemoteArgs = createRemoteArgs;
    this.fileFields = {
      product: ["images"],
      sku: ["image", "product.images"]
    };
  }

  download(payload, type) {
    const fields = this.fileFields[type.toLowerCase()];

    fields.forEach(field => {
      const splitPath = field.split(".");
      let urls = this.getNestedObject(payload, splitPath);
      if (!urls || !urls.length) return;
      if (!Array.isArray(urls)) urls = [urls];

      const sourceObject = splitPath.length >= 1
        ? this.getNestedObject(payload, splitPath.slice(0, -1))
        : payload;
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

  // Access nested objects with path given as array.
  getNestedObject (object, path) {
    return path.reduce((obj, key) => (obj[key]), object);
  }
}

module.exports = LocalFile;