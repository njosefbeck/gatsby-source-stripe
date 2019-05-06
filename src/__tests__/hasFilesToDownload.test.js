const hasFilesToDownload = require("../helpers/hasFilesToDownload");

describe("hasFilesToDownload()", () => {
  test("returns true when node has image", () => {
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

    const expected = true;

    expect(hasFilesToDownload(node)).toBe(expected);
  });

  test("returns false when node has no image", () => {
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

    const expected = false;

    expect(hasFilesToDownload(node)).toBe(expected);
  });

  test("returns true when node has images", () => {
    const node = {
      id: "prod_EyUMnCrvQMhw3b",
      object: "product",
      images: [
        "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png",
        "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png",
        "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png"
      ],
      type: "good",
      updated: 1556536238
    };

    const expected = true;

    expect(hasFilesToDownload(node)).toBe(expected);
  });

  test("returns false when node has no images", () => {
    const node = {
      id: "prod_EyUMnCrvQMhw3b",
      object: "product",
      images: [],
      type: "good",
      updated: 1556536238
    };

    const expected = false;

    expect(hasFilesToDownload(node)).toBe(expected);
  });
});
