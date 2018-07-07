const stripeClient = require('stripe');
const stripeObject = require('./stripeObject');

exports.sourceNodes = async (
	{ boundActionCreators },
	{ objects = [], secretKey = "" }
) => {

	const { createNode } = boundActionCreators;

	if (!objects.length) {
		console.error(new Error("No Stripe objects found in your gatsby-config options. Please add objects you'd like to query in Stripe."));
		done();
	}

	if (!secretKey) {
		console.error(new Error("No Stripe secret key found in your gatsby-config options. Please add!"));
		done();
	}

	const stripe = stripeClient(secretKey);

	// Initialize stripeObjects based on gatsby plugin config
	const stripeObjects = objects.map(object => {
		const stripeObj = Object.create(stripeObject);
		stripeObj.init(object);
		return stripeObj;
	});

	for (const stripeObj of stripeObjects) {
		const apiObject = await stripeObj.getApiObject(stripe);
		const paginatedObject = await stripeObj.paginateData(stripe, apiObject);
		stripeObj.data = paginatedObject;
		stripeObj.buildNodes();
		stripeObj.nodes.forEach(node => {
			// Ensure that the node doesn't have
			// an owner set before creating the node
			delete node.internal.owner;
			createNode(node);
		});
	}

	return;

}
