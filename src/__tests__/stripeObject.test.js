const StripeObject = require('../stripeObject')

describe('StripeObject', () => {
  test('constructor initializes the right object given a known type', () => {
    const type = 'Sku'
    const instance = new StripeObject('Sku')

    expect(instance.name).toBe('skus')
    expect(instance.type).toBe('Sku')
    expect(instance.methodName).toBe('list')
  })

  test('constructor throws an error when given an unknown type', () => {
    const type = 'Review'
    const error = `Unknown type: ${type} passed to StripeObject. This type is not supported.`

    expect(() => new StripeObject(type)).toThrow(error)
  })
})