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

  describe('objectPath', () => {

    const stripe = {
      orders: {
        list: () => 'Listing out orders...'
      },
      issuing: {
        authorizations: {
          list: () => 'Listing issuing authorizations...'
        }
      }
    }

    test('returns proper top-level stripe-node resource object', () => {
      const instance = new StripeObject('Order')
      const resourceObject = instance.objectPath(stripe)

      expect(resourceObject.list()).toBe('Listing out orders...')
    })

    test('returns proper namespaced stripe-node resource object', () => {
      const instance = new StripeObject('IssuingAuthorization')
      const resourceObject = instance.objectPath(stripe)

      expect(resourceObject.list()).toBe('Listing issuing authorizations...')
    })
  })
})