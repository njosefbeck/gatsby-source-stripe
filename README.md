# gatsby-source-stripe

Source plugin for pulling in data from the [Stripe API](https://stripe.com/docs/api). Current with Stripe API version [2020-03-02](https://stripe.com/docs/upgrades#2020-03-02).

This plugin is a source plugin, so it brings in your Stripe data. Use cases for this Stripe source plugin:

* Create an ecommerce store. This plugin will allow you to bring your products and skus into your Gatsby site, and then you can use Stripe Checkout via the [gatsby-plugin-stripe-checkout](https://github.com/njosefbeck/gatsby-plugin-stripe-checkout) plugin.
* Create various dashboards around customers, invoices, etc. Use this plugin to bring in any of the data types listed below.

Do you use this plugin in your Gatsby project? Let us know and we can add it here as an example!

Check out the [CHANGELOG](https://github.com/njosefbeck/gatsby-source-stripe/blob/master/CHANGELOG.md) for past and upcoming updates.

## Install

`npm install gatsby-source-stripe`

or

`yarn add gatsby-source-stripe`

## How to use

**NOTE: You must be using Gatsby version 2.0.15 or greater.**

In the plugin options objects' array, specify the object types you would like to get data for. For example, if you'd like to get the lists of data for your Skus and Products, your objects array would look like this: `['Product', 'Sku']`.

Additionally, only include your Stripe secret key via a [.env](https://www.npmjs.com/package/dotenv) file that is not version-controlled. We don't want your key ending up in your version-controlled source code! For enhanced security, you can also create a [restricted API key](https://stripe.com/docs/keys#limiting-access-with-restricted-api-keys) in your Stripe Developer Dashboard. Since this plugin only ever sources data, you can restrict `All core resources` to `Read only`, and even turn off access to certain resources that you know you don't use.

Enable [downloading files](#downloading-files) associated with your Stripe Skus and Products by setting `downloadFiles` to true.

Example:

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-stripe`,
    options: {
      objects: ['Balance', 'BalanceTransaction', 'Product', 'ApplicationFee', 'Sku', 'Subscription'],
      secretKey: 'stripe_secret_key_here',
      downloadFiles: true,
    }
  }
]
```

### Supported List of Types

Below is a table with a list of the Stripe types supported in the options' objects array, as well as what Stripe API method the type maps to, and any other additional notes.

| Type | Stripe API Method | Notes |
| --- | --- | --- |
| Balance  | [stripe.balance.retrieve()](https://stripe.com/docs/api/balance/balance_retrieve?lang=node) | Not iterable |
| BalanceTransaction | [stripe.balanceTransactions.list()](https://stripe.com/docs/api/balance/balance_history?lang=node) | None |
| Charge | [stripe.charges.list()](https://stripe.com/docs/api/charges/list?lang=node) | None |
| Customer | [stripe.customers.list()](https://stripe.com/docs/api/customers/list?lang=node) | None |
| Dispute | [stripe.disputes.list()](https://stripe.com/docs/api/disputes/list?lang=node) | None |
| Event | [stripe.events.list()](https://stripe.com/docs/api/events/list?lang=node) | None |
| File | [stripe.files.list()](https://stripe.com/docs/api/files/list?lang=node) | None |
| FileLink | [stripe.fileLinks.list()](https://stripe.com/docs/api/file_links/list?lang=node) | None |
| PaymentIntent | [stripe.paymentIntents.list()](https://stripe.com/docs/api/payment_intents/list?lang=node) | None |
| Payout | [stripe.payouts.list()](https://stripe.com/docs/api/payouts/list?lang=node) | None |
| Product | [stripe.products.list()](https://stripe.com/docs/api/products/list?lang=node) | None |
| Refund | [stripe.refunds.list()](https://stripe.com/docs/api/refunds/list?lang=node) | None |
| Coupon | [stripe.coupons.list()](https://stripe.com/docs/api/coupons/list?lang=node) | None |
| Invoice | [stripe.invoices.list()](https://stripe.com/docs/api/invoices/list?lang=node) | None |
| InvoiceItem | [stripe.invoiceItems.list()](https://stripe.com/docs/api/invoiceitems/list?lang=node) | None |
| Plan | [stripe.plans.list()](https://stripe.com/docs/api/plans/list?lang=node) | None |
| Subscription | [stripe.subscriptions.list()](https://stripe.com/docs/api/subscriptions/list?lang=node) | None |
| Account | [stripe.accounts.list()](https://stripe.com/docs/api/accounts/list?lang=node) | None |
| ApplicationFee | [stripe.applicationFees.list()](https://stripe.com/docs/api/application_fees/list?lang=node) | None |
| CountrySpec | [stripe.countrySpecs.list()](https://stripe.com/docs/api/country_specs/list?lang=node) | None |
| TopUp | [stripe.topUps.list()](https://stripe.com/docs/api/topups/list?lang=node) | None |
| Transfer | [stripe.transfers.list()](https://stripe.com/docs/api/transfers/list?lang=node) | None |
| IssuingAuthorization | [stripe.issuing.authorizations.list()](https://stripe.com/docs/api/issuing/authorizations/list?lang=node) | Issuing is in closed beta. Can only get data if you have access to the beta. |
| IssuingCardholder | [stripe.issuing.cardholders.list()](https://stripe.com/docs/api/issuing/cardholders/list?lang=node) | Issuing is in closed beta. Can only get data if you have access to the beta. |
| IssuingCard | [stripe.issuing.cards.list()](https://stripe.com/docs/api/issuing/cards/list?lang=node) | Issuing is in closed beta. Can only get data if you have access to the beta. |
| IssuingDispute | [stripe.issuing.disputes.list()](https://stripe.com/docs/api/issuing/disputes/list?lang=node) | Issuing is in closed beta. Can only get data if you have access to the beta. |
| IssuingTransaction | [stripe.issuing.transactions.list()](https://stripe.com/docs/api/issuing/transactions/list?lang=node) | Issuing is in closed beta. Can only get data if you have access to the beta. |
| TerminalLocation | [stripe.terminal.locations.list()](https://stripe.com/docs/api/terminal/locations/list?lang=node) | None |
| TerminalReader | [stripe.terminal.readers.list()](https://stripe.com/docs/api/terminal/readers/list?lang=node) | None |
| Order | [stripe.orders.list()](https://stripe.com/docs/api/orders/list?lang=node) | None |
| OrderReturn | [stripe.orderReturns.list()](https://stripe.com/docs/api/order_returns/list?lang=node) | None |
| Sku | [stripe.skus.list()](https://stripe.com/docs/api/skus/list?lang=node) | None |
| SigmaScheduledQueryRun | [stripe.sigma.ScheduledQueryRuns.list()](https://stripe.com/docs/api/sigma/scheduled_queries/list?lang=node) | Only works with live secret keys, not test keys |
| WebhookEndpoint | [stripe.webhookEndpoints.list()](https://stripe.com/docs/api/webhook_endpoints/list?lang=node) | None |
| CreditNote | [stripe.creditNotes.list()](https://stripe.com/docs/api/credit_notes/list?lang=node) | None |
| Review | [stripe.reviews.list()](https://stripe.com/docs/api/radar/reviews/list?lang=node) | None |


## Expanding Objects

Expanding all Stripe objects is tricky, as some objects have a lot of nested sub-objects to expand! We've tried to auto-expand as much of the top-level objects as possible. You can peruse a list of what is expanded per object in the `stripeObjects.json` file.

## Auto-pagination

**NOTE: Due to stripe-node's [autopagination recommendations](https://github.com/stripe/stripe-node#auto-pagination) this plugin has been tested against v10.13.0. If you experience any issues with earlier versions of Node, please first consider upgrading your Node version. Otherwise, file an issue and we'll try to resolve!**

All list responses are fully paginated.

## Downloading Files

Setting `downloadFiles: true` in the plugin configuration enables downloading of images on Sku and Product objects. A Gatsby [File node](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem#how-to-query) is created for each downloaded file, and references are placed on the `localFiles` field of their Stripe nodes.

You can give these File nodes to plugins like [gatsby-image](https://using-gatsby-image.gatsbyjs.org/) to create responsive images and/or [gatsby-transformer-sharp](https://image-processing.gatsbyjs.org/) to process images at build.

## How to query

**NOTE: For the example below, be sure that you actually have products with SKUs in your Stripe account, otherwise you will get an error saying: `Cannot query field "allStripeSku" on type "Query"`.**

Below is an example query for fetching all your Stripe SKUs. Note that the `localFiles` will not be there if you didn't specify `downloadFiles: true` in the plugin options.

```graphql
{
  allStripeSku {
    edges {
      node {
        id,
        active,
        localFiles {
          id
        }
        product {
          id
        }
      }
    }
  }
}
```

Just replace "Sku" with any of the types used in your config `objects` array.

You can also query for a specific Stripe object like this:

```graphql
{
  stripeCustomer(id: { eq: "customer_id_here" }) {
    id,
    name
  }
}
```

When using GraphiQL, click on "Docs" in the top-right corner of the screen to explore all of the Stripe data being brought in, including their schemas. Additionally, check out Gatsby's handy [GraphQL Reference](https://www.gatsbyjs.org/docs/graphql-reference/) for information about filtering, sorting, etc.

## Gotchas

This section outlines common questions and issues that other user's have run into and how they were resolved.

### "My Subscription objects aren't showing up in my GraphQL results"

This issue comes up when trying to get back all SKU for your account, expecting that products of type `service` will also be present. As Subscriptions (products of type `service`) don't have SKUs, they won't show up in the SKU results. To get back those, you must also query for `Product` objects.

Thus, for those who have Subscription products, we recommend you have an `objects` array like below.

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-stripe`,
    options: {
      objects: ['Sku', 'Product'],
      secretKey: 'stripe_secret_key_here',
      downloadFiles: true,
    }
  }
]
```

## Develop

Would you like to help maintain this project? We would love your help! Checkout [issues](https://github.com/njosefbeck/gatsby-source-stripe/issues) and look for tags labeled `help wanted`. Also please check out our [CODE OF CONDUCT](CODE_OF_CONDUCT.md) and our [CONTRIBUTING](CONTRIBUTING.md) documents.

To set up the project locally, follow these steps:

1) Fork the repo and pull it down locally. For ease of testing, we recommend pulling it into an existing Gatsby project, in a `plugins` directory.
2) Add the plugin, with options, to `gatsby-config.js`.
3) Install dependencies by running `npm install` in the project directory.
4) Run `npm run build` in the console, to transpile the code for testing and running in your project.
5) Hack away!

Included is an [ESLint](https://eslint.org) config to help check the correctness of your changes of your code, and a [prettier](https://prettier.io) config to format it. Use them with the corresponding plugins for your editor of choice, or run the tools from the command line with `npm run lint` and `npm run format`. Don't forget to format your changes with prettier before submitting a PR!
