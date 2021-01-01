const extractChildUrls = require("../helpers/extractChildUrls");

describe("extractChildUrls()", () => {
  test.each(["sku", "price"])(
    "returns empty array when %s node has no image",
    (object) => {
      const node = {
        id: `${object}_Ew1GWVDLcI23bd`,
        object,
        image: null,
        product: "prod_BosWT9EsdzgjPn",
        updated: 1555966756,
        parent: null,
        children: [],
        internal: {},
      };

      const expected = [];

      expect(extractChildUrls(node)).toEqual(expected);
    }
  );

  test.each(["sku", "price"])(
    "returns product image urls even when %s has no image",
    (object) => {
      const node = {
        id: `${object}_Ew1GWVDLcI23bd`,
        object,
        image: null,
        product: {
          id: "prod_EyUMnCrvQMhw3b",
          object: "product",
          images: [
            "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
            "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
            "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png",
          ],
          type: "good",
          updated: 1556536238,
        },
        updated: 1555966756,
        parent: null,
        children: [],
        internal: {},
      };

      const expected = [
        {
          location: "product",
          url:
            "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
        },
        {
          location: "product",
          url:
            "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
        },
        {
          location: "product",
          url:
            "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png",
        },
      ];

      expect(extractChildUrls(node)).toEqual(expected);
    }
  );

  test.each(["sku", "price"])("returns %s node image url", (object) => {
    const node = {
      id: `${object}_Ew1GWVDLcI23bd`,
      object,
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      product: "prod_BosWT9EsdzgjPn",
      updated: 1555966756,
      parent: null,
      children: [],
      internal: {},
    };

    const expected = [
      {
        location: "root",
        url: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      },
    ];

    expect(extractChildUrls(node)).toEqual(expected);
  });

  test.each(["sku", "price"])(
    "returns %s node image url and product image urls",
    (object) => {
      const node = {
        id: `${object}_Ew1GWVDLcI23bd`,
        object,
        image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
        product: {
          id: "prod_EyUMnCrvQMhw3b",
          object: "product",
          images: [
            "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
            "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
            "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png",
          ],
          type: "good",
          updated: 1556536238,
        },
        updated: 1555966756,
        parent: null,
        children: [],
        internal: {},
      };

      const expected = [
        {
          location: "root",
          url: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
        },
        {
          location: "product",
          url:
            "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
        },
        {
          location: "product",
          url:
            "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
        },
        {
          location: "product",
          url:
            "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png",
        },
      ];

      expect(extractChildUrls(node)).toEqual(expected);
    }
  );
});
