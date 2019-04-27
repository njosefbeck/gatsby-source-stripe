const StripeObject = require("../StripeObject");
const crypto = require(`crypto`);

/**
 * createContentDigest() implementation taken from:
 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/create-content-digest.js
 */
const createContentDigest = input => {
  const content = typeof input !== `string` ? JSON.stringify(input) : input;

  return crypto
    .createHash(`md5`)
    .update(content)
    .digest(`hex`);
};

describe("StripeObject", () => {
  describe("constructor", () => {
    test("throws error when given unknown type", () => {
      const type = "Review";
      const error = `Unknown type: ${type} passed to StripeObject. This type is not supported.`;

      expect(() => new StripeObject(type)).toThrow(error);
    });

    test("initializes object given a known type", () => {
      const type = "Sku";
      const instance = new StripeObject("Sku");

      expect(instance.name).toBe("skus");
      expect(instance.type).toBe("Sku");
      expect(instance.methodName).toBe("list");
    });
  });

  describe("objectPath()", () => {
    const stripe = {
      orders: {
        list: () => "Listing out orders..."
      },
      issuing: {
        authorizations: {
          list: () => "Listing issuing authorizations..."
        }
      }
    };

    test("returns top-level stripe-node resource object", () => {
      const instance = new StripeObject("Order");
      const resourceObject = instance.objectPath(stripe);

      expect(resourceObject.list()).toBe("Listing out orders...");
    });

    test("returns namespaced stripe-node resource object", () => {
      const instance = new StripeObject("IssuingAuthorization");
      const resourceObject = instance.objectPath(stripe);

      expect(resourceObject.list()).toBe("Listing issuing authorizations...");
    });
  });

  describe("node()", () => {
    test("creates Gatsby node from stripe-node resource payload", () => {
      const instance = new StripeObject("Sku");
      const payload = {
        id: "sku_Ew1GWVDLcI23bd",
        object: "sku",
        active: true,
        attributes: {
          size: "Medium",
          gender: "Unisex"
        },
        created: 1555966756,
        currency: "usd",
        image: null,
        inventory: {
          quantity: null,
          type: "infinite",
          value: null
        },
        livemode: false,
        metadata: {},
        package_dimensions: null,
        price: 1500,
        product: "prod_BosWT9EsdzgjPn",
        updated: 1555966756
      };
      const expected = {
        ...payload,
        id: "sku_Ew1GWVDLcI23bd",
        parent: null,
        children: [],
        internal: {
          mediaType: "application/json",
          type: `Stripe${instance.type}`,
          content: JSON.stringify(payload),
          contentDigest: createContentDigest(payload),
          description: instance.description
        }
      };

      expect(instance.node(createContentDigest, payload)).toEqual(expected);
    });
  });
});
