const checkForStripeObjects = require('../checkForStripeObjects')

describe('plugin', () => {
  describe(', when options: object array', () => {
    test('is empty, throws error', () => {
      const objects = []
      const error = "No Stripe object types found in gatsby-config. Add types to objects array like this: ['Balance', 'Customer', 'BalanceTransaction']"

      expect(() => checkForStripeObjects(objects)).toThrow(error)
    })

    test('is not empty, does not throw error', () => {
      const objects = ['Sku']

      expect(checkForStripeObjects(objects)).toBe(undefined)
    })
  })
})