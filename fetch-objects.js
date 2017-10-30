const stripeClient = require('stripe');
const fetchStripeData = require('./fetch-stripe-data');

module.exports = async (objects, secretKey) => {

	const stripe = stripeClient(secretKey);

	const promises = objects.map(async objectName => fetchStripeData(stripe, objectName));
	return Promise.all(promises).then(results => [].concat(...results)).catch(err => console.error(err));
};