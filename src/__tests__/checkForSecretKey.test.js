const checkForSecretKey = require("../helpers/checkForSecretKey");

describe("plugin", () => {
  describe(", when options: secretKey", () => {
    test("is empty, throws error", () => {
      const secretKey = "";
      const error = "No Stripe secret key found in gatsby-config";

      expect(() => checkForSecretKey(secretKey)).toThrow(error);
    });

    test("is not empty, does not throw error", () => {
      const secretKey = "a_secret_key";

      expect(checkForSecretKey(secretKey)).toBe(undefined);
    });
  });
});
