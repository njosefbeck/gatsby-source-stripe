describe('StripeObject', () => {
  test('initializes the right object given a known type', () => {
    const type = 'Sku'
    const instance = new StripeObject('Sku')

    expect(instance.name).toBe('skus')
    expect(instance.type).toBe('Sku')
    expect(instance.methodName).toBe('list')
  })
})