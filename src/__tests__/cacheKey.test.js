const cacheKey = require("../helpers/cacheKey");

describe("cacheKey()", () => {
  test("returns Gatsby cache key when given file url", () => {
    const url =
      "https://files.stripe.com/files/f_test_SWXjBddZpg3sRYV6R9yVBpu3";
    const expected = `stripe-file-${url}`;

    expect(cacheKey(url)).toBe(expected);
  });
});
