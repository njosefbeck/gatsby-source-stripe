"use strict";

function checkForStripeObjects(objects) {
  if (!objects.length) {
    throw new Error("No Stripe object types found in gatsby-config. Add types to objects array like this: ['Balance', 'Customer', 'BalanceTransaction']");
  }
}

module.exports = checkForStripeObjects;