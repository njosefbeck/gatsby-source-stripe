const extractSkuUrls = require("../helpers/extractSkuUrls");

describe("extractSkuUrls()", () => {
  test("returns empty array when sku node has no image", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: null,
      product: "prod_BosWT9EsdzgjPn",
      updated: 1555966756,
      parent: null,
      children: [],
      internal: {}
    };

    const expected = [];

    expect(extractSkuUrls(node)).toEqual(expected);
  });

  test("returns product image urls even when sku has no image", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: null,
      product: {
        id: "prod_EyUMnCrvQMhw3b",
        object: "product",
        images: [
          "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
          "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
          "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png"
        ],
        type: "good",
        updated: 1556536238
      },
      updated: 1555966756,
      parent: null,
      children: [],
      internal: {}
    };

    const expected = [
      {
        location: "product",
        url:
          "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png"
      },
      {
        location: "product",
        url:
          "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png"
      },
      {
        location: "product",
        url:
          "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png"
      }
    ];

    expect(extractSkuUrls(node)).toEqual(expected);
  });

  test("returns sku node image url", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      product: "prod_BosWT9EsdzgjPn",
      updated: 1555966756,
      parent: null,
      children: [],
      internal: {}
    };

    const expected = [
      {
        location: "root",
        url: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3"
      }
    ];

    expect(extractSkuUrls(node)).toEqual(expected);
  });

  test("returns sku node image url and product image urls", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      product: {
        id: "prod_EyUMnCrvQMhw3b",
        object: "product",
        images: [
          "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
          "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
          "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png"
        ],
        type: "good",
        updated: 1556536238
      },
      updated: 1555966756,
      parent: null,
      children: [],
      internal: {}
    };

    const expected = [
      {
        location: "root",
        url: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3"
      },
      {
        location: "product",
        url:
          "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png"
      },
      {
        location: "product",
        url:
          "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png"
      },
      {
        location: "product",
        url:
          "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png"
      }
    ];

    expect(extractSkuUrls(node)).toEqual(expected);
  });
});
