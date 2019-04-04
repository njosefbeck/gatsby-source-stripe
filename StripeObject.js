"use strict";

const stripeObjs = require('./stripeObjects.json');

class StripeObject {
  constructor(type) {
    const obj = stripeObjs.objects.find(o => o.type === type);
    this.id = obj.id;
    this.product = obj.product;
    this.name = obj.name;
    this.type = obj.type;
    this.description = obj.description;
    this.canIterate = obj.canIterate;
    this.methodName = obj.methodName;
    this.methodArgs = obj.methodArgs;
  }

  objectPath(stripe) {
    let path = null;

    if (this.product) {
      path = stripe[this.product][this.name];
    } else {
      path = stripe[this.name];
    }

    return path;
  }

  node(createContentDigest, payload, fileNodes) {
    const node = Object.assign({}, payload, {
      id: payload.id ? payload.id : `Stripe${this.type}${this.id}`,
      parent: null,
      children: [],
      internal: {
        mediaType: 'application/json',
        type: `Stripe${this.type}`,
        content: JSON.stringify(payload),
        contentDigest: createContentDigest(payload),
        description: this.description
      }
    });
    /* We are currently making the assumption that we will not need to assign a localFiles
    field more than one level deep on the node object. This is a relatively safe assumption
    but may need to be revisited if Stripe introduces nested expandable objects. */

    if (fileNodes) {
      Object.entries(fileNodes).forEach(([nodeField, fileNodesValues]) => {
        if (!fileNodesValues) return; // If we failed to grab the file then the node will be null

        const fileNodeIds = fileNodesValues.map(fileNode => fileNode.id);
        if (nodeField === "root") node.localFiles___NODE = fileNodeIds;else node[nodeField].localFiles___NODE = fileNodeIds;
      });
    }

    return node;
  }

}

module.exports = StripeObject;