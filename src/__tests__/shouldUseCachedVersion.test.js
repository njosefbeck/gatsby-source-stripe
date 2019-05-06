const shouldUseCachedVersion = require("../helpers/shouldUseCachedVersion");

describe("shouldUseCachedVersion()", () => {
  test("returns undefined when no cached file present", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      updated: 1555966756,
    };

    const cachedFile = undefined;

    const expected = undefined;

    expect(shouldUseCachedVersion(cachedFile, node)).toBe(expected);
  })

  test("returns true when cached file updated timestamp = fetched node updated timestamp", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      updated: 1555966756,
    };

    const cachedFile = {
      fileNodeId: "71c34662-6557-5fe4-a2f0-931be50fb7c7",
      updated: 1555966756,
    }

    const expected = true;

    expect(shouldUseCachedVersion(cachedFile, node)).toBe(expected);
  })

  test("returns false when cached file updated timestamp != fetched node updated timestamp", () => {
    const node = {
      id: "sku_Ew1GWVDLcI23bd",
      object: "sku",
      image: "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3",
      updated: 1556748059,
    };

    const cachedFile = {
      fileNodeId: "71c34662-6557-5fe4-a2f0-931be50fb7c7",
      updated: 1555966756,
    }

    const expected = false;

    expect(shouldUseCachedVersion(cachedFile, node)).toBe(expected);
  })
})
