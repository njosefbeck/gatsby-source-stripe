const stripeObjs = require("./stripeObjects.json");

class StripeObject {
  constructor(type) {
    const obj = stripeObjs.objects.find(o => o.type === type);

    if (!obj) {
      throw new Error(`Unknown type: ${type} passed to StripeObject. This type is not supported.`)
    }

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

  node(createContentDigest, payload) {
    const node = {
      ...payload,
      id: payload.id || `Stripe${this.type}${this.id}`,
      parent: null,
      children: [],
      internal: {
        type: `Stripe${this.type}`,
        content: JSON.stringify(payload),
        contentDigest: createContentDigest(payload),
        description: this.description
      }
    };

    return node;
  }
}

module.exports = StripeObject;
