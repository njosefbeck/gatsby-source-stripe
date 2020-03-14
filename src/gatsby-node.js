const Stripe = require("stripe");
const StripeObject = require("./StripeObject");
const FileDownloadService = require("./FileDownloadService")
const checkForSecretKey = require('./helpers/checkForSecretKey')
const checkForStripeObjects = require("./helpers/checkForStripeObjects")

exports.sourceNodes = async (
  { actions, cache, createNodeId, createContentDigest, getNode, store },
  { downloadFiles = false, objects = [], secretKey = "" }
) => {
  const { createNode, touchNode } = actions;

  checkForStripeObjects(objects)
  checkForSecretKey(secretKey)

  const stripe = new Stripe(secretKey, {
    appInfo: {
      name: "Gatsby.js Stripe Source Plugin",
      version: "3.0.7",
      url: "https://github.com/njosefbeck/gatsby-source-stripe"
    }
  });

  // Initialize stripeObjects based on gatsby plugin objects
  const stripeObjects = objects.map(type => new StripeObject(type));

  for (const stripeObj of stripeObjects) {
    /*
     * Outputs the stripe object's path, to allow us to
     * get to the proper method
     *
     * Example outputs:
     * const path = stripe['customers']
     * const path = stripe['terminal']['readers']
     */
    const path = stripeObj.objectPath(stripe);

    /*
     * Some Stripe objects, like "Balance" aren't iterable.
     * The canIterate key is set manually in stripeObjects.json
     * based on testing the different object types.
     */
    if (!stripeObj.canIterate) {
      let payload = await path[stripeObj.methodName](stripeObj.methodArgs);
      const node = stripeObj.node(createContentDigest, payload);
      createNode(node);
      continue;
    }

    /*
     * Use for - await - of as per the Stripe.js Node documentation
     * for auto pagination purposes
     *
     * path[stripeObj.methodName](stripeObj.methodArgs) translates to
     * something like the following, depending on the object types
     * passed in the config:
     *
     * stripe['customers']['list']({ "expand": "data.default_source" })
     */
    for await (let payload of path[stripeObj.methodName](
      stripeObj.methodArgs
    )) {
      /**
       * Leaving this in here as a reminder that, depending on what the Gatsby.js
       * team says, I'll need to deal with event objects for skus and products having
       * the same attributes key, but having different data types (i.e. sku.attributes
       * is an object, and product.attributes is an array).
       */
      /*
      if (payload.object == 'event' && Array.isArray(payload.data.object.attributes)) {
        console.log(payload.data.object.object);
        console.log(payload.data.object.attributes);
      }
      */

      let node = stripeObj.node(createContentDigest, payload);

      if (downloadFiles) {
        const downloadService = new FileDownloadService({
          store,
          cache,
          createNode,
          createNodeId,
          touchNode,
          getNode
        });
        node = await downloadService.downloadAndAddTo(node)
      }

      createNode(node);
    }
  }
};
