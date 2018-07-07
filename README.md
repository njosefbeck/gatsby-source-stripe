# gatsby-source-stripe

Source plugin for pulling in data from the [Stripe API](https://stripe.com/docs/api). Specifically, with this plugin you are able to access data found at these API methods:

```javascript
stripe.balance.listTransactions
stripe.charges.list
stripe.customers.list
stripe.disputes.list
stripe.events.list
stripe.fileUploads.list
stripe.payouts.list
stripe.refunds.list
stripe.coupons.list
stripe.invoices.list
stripe.invoiceItems.list
stripe.plans.list
stripe.subscriptions.list
stripe.accounts.list
stripe.applicationFees.list
stripe.countrySpecs.list
stripe.transfers.list
stripe.orders.list
stripe.products.list
stripe.orderReturns.list
stripe.skus.list
stripe.scheduledQueryRuns.list
```

This plugin is a source plugin, so it only brings in the data (to be used, for example, in creating a Stripe dashboard, or an e-commerce store). To actually edit the data in your Stripe account, to handle transactions, make charges, you will need to use some kind of backend server. I favor a serverless setup using [clay.run](https://clay.run), but really it's whatever floats your boat!

## Expanding Objects

All Stripe objects that [have expandable](https://stripe.com/docs/api#expanding_objects) sub-objects have been expanded. For example, when you retrieve a SKU using the Stripe API, there's a "product" key in the returned SKU object, which by default is an id of an associated product object. Instead of you having to query for that specific product object, this plugin will auto-expand it for you, so all of the associated product data can be accessed via the SKU object.

## Install

`npm install gatsby-source-stripe`

or

`yarn add gatsby-source-stripe`

## How to use

Note: In your objects array, the strings match the middle object name from the API. So, for example, if I want to get all of my customers' data, which can be found at `stripe.customers.list`, I would use the string `'customers'` in my objects array. Example below.

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-stripe`,
    options: {
      objects: ['balance', 'customers', 'products', 'applicationFees', 'skus', 'subscriptions'],
      secretKey: 'stripe_secret_key_here'
    }
  }
]
```

## How to query

You can query all of the different Stripe object data like the following:

```graphql
{
  allStripeCustomer {
    edges {
      node {
        id,
        active,
        attributes,
        skus {
          id
        }
      }
    }
  }
}
```

Just replace "Customer" with the singular version of the string used in the objects array in gatsby-config.js.

You can also query for a specific object like this:

```graphql
{
  StripeCustomer(id: { eq: "customer_id_here" }) {
    id,
    name
  }
}
```

