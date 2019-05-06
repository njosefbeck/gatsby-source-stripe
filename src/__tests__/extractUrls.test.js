const extractUrls = require("../helpers/extractUrls");

describe("extractUrls()", () => {
  test("returns empty array when product has no images", () => {
    const node = {
      id: "prod_EyUMnCrvQMhw3b",
      object: "product",
      images: [],
      type: "good",
      updated: 1556536238
    };

    const expected = [];

    expect(extractUrls(node)).toEqual(expected);
  });

  test("returns urls when product has images", () => {
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

    const expected = [
      {
        location: "root",
        url:
          "https://images.ctfassets.net/wubeq4r3otg9/4z8w2ARN4Qk2qUKeWIaMa6/d75a0e74446c6e1df1155b754b92372d/black.png"
      },
      {
        location: "root",
        url:
          "https://images.ctfassets.net/wubeq4r3otg9/3q7n4GuUhWaQY82Iw64KEq/9dffaeb403227171594c2dda9a5df333/rainbow.png"
      },
      {
        location: "root",
        url:
          "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png"
      }
    ];

    expect(extractUrls(node)).toEqual(expected);
  });
});
