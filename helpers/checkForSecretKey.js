"use strict";

function checkForSecretKey(secretKey) {
  if (!secretKey) {
    throw new Error("No Stripe secret key found in gatsby-config");
  }
}

module.exports = checkForSecretKey;