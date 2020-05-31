const addLocalFiles = require("../helpers/addLocalFiles");

describe("addLocalFiles()", () => {
  test("adds local files to root node", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      product: "prod_BosWT9EsdzgjPn",
    };

    const fileNodeIds = [
      {
        location: "root",
        id: "8fa3f02d-5e34-5191-bf6a-7533210053fc",
      },
    ];

    const expected = {
      ...node,
      localFiles___NODE: ["8fa3f02d-5e34-5191-bf6a-7533210053fc"],
    };

    expect(addLocalFiles(node, fileNodeIds)).toEqual(expected);
  });

  test("adds local files to root and sub-nodes", () => {
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
          "https://njosefbeck.github.io/lets-watch-sailormoon/static/media/sailor_moon_logo.1630c2ed.png",
        ],
        type: "good",
        updated: 1556536238,
      },
    };

    const fileNodeIds = [
      {
        location: "root",
        id: "8fa3f02d-5e34-5191-bf6a-7533210053fc",
      },
      {
        location: "product",
        id: "67735a50-5109-51be-85b4-803f05d27797",
      },
      {
        location: "product",
        id: "7bffbe3e-beed-5893-bc26-eaec9fc6d787",
      },
      {
        location: "product",
        id: "b9c3ae18-78f9-5b31-8e6b-372de7b6102a",
      },
    ];

    const expected = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
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
        localFiles___NODE: [
          "67735a50-5109-51be-85b4-803f05d27797",
          "7bffbe3e-beed-5893-bc26-eaec9fc6d787",
          "b9c3ae18-78f9-5b31-8e6b-372de7b6102a",
        ],
      },
      localFiles___NODE: ["8fa3f02d-5e34-5191-bf6a-7533210053fc"],
    };

    expect(addLocalFiles(node, fileNodeIds)).toEqual(expected);
  });
});
