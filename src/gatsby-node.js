const stripeClient = require('stripe');
const StripeObject = require('./StripeObject');
const LocalFile = require('./LocalFile');

exports.sourceNodes = async (
  { actions, cache, createNodeId, createContentDigest, store },
  { downloadFiles = false, objects = [], secretKey = "", auth = true }
) => {

  const { createNode } = actions;

  if (!objects.length) {
    console.error(new Error("No Stripe object types found in your gatsby-config. Add types to the objects array like this: ['Balance', 'Customer', 'BalanceTransaction']"));
    return;
  }

  if (!secretKey) {
    console.error(new Error("No Stripe secret key found in your gatsby-config."));
    return;
  }

  const localFile = new LocalFile({
    store,
    cache,
    createNode,
    createNodeId,
    auth: { htaccess_user: secretKey }
  });

  const stripe = stripeClient(secretKey);

  stripe.setAppInfo({
    name: "Gatsby.js Stripe Source Plugin",
    version: "2.0.0",
    url: "https://www.npmjs.com/package/gatsby-source-stripe"
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
    for await (let payload of path[stripeObj.methodName](stripeObj.methodArgs)) {

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

      /*
      * Download and create File nodes for object images, only if
      * downloadFiles is configured.
      *
      * Adds the localFiles field, which is an array of
      * references to the created File nodes.
      *
      * Currently supports File, Product and Sku images.
      */
     let fileNodesMap;

     if (downloadFiles) {
       fileNodesMap = await localFile.downloadFiles(payload, stripeObj.type, auth);
     }

     const node = stripeObj.node(createContentDigest, payload, fileNodesMap);
     createNode(node);
    }
  }

  return;

};
