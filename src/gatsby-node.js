const fetchObjects = require('./fetch-objects');
const buildNodes = require('./build-nodes');

exports.sourceNodes = async (
	{ boundActionCreators, getNode, hasNodeChanged },
	{ objects = [], secretKey = "" },
	done
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

	const stripeObjects = await fetchObjects(objects, secretKey);
	const nodes = stripeObjects.map(stripeObject => buildNodes(stripeObject));
	nodes.forEach(node => createNode(node));

	console.log(`${nodes.length} nodes were created.`);

	done();

}