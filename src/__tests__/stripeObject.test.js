const StripeObject = require('../stripeObject')

describe('StripeObject', () => {
  describe('constructor', () => {
    test('throws an error when given an unknown type', () => {
      const type = 'Review'
      const error = `Unknown type: ${type} passed to StripeObject. This type is not supported.`

      expect(() => new StripeObject(type)).toThrow(error)
    })

    test('initializes the right object given a known type', () => {
      const type = 'Sku'
      const instance = new StripeObject('Sku')

      expect(instance.name).toBe('skus')
      expect(instance.type).toBe('Sku')
      expect(instance.methodName).toBe('list')
    })
  })
})