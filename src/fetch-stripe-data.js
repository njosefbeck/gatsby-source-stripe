const paginate = require('./paginate');
const capitalize = require('./capitalize');

module.exports = async (stripe, objectName) => {
	let methodName = "list";

	if (!objectName) {
		throw new Error("An object name is missing in your Stripe objects array.");
	}

	// Handle differences in method calls
	if (objectName === "balance") {
		methodName = "listTransactions";
	}

	const object = await stripe[objectName][methodName]();

	// Paginate Stripe data if necessary
	const data = await paginate(stripe, object, objectName, methodName);

	// Let user know that some objects they supplied don't have data.
	// Map call below won't return these empty data objects, so don't
	// need to return early here.
	if (!data.length) {
		console.error(`There was no data found for objectName: ${objectName}. Skipping it...`);
	}

	// Add objectName to each data object, for use later
	// when making nodes
	return data.map(item => {
		return {
			...item,
			type: capitalize(objectName)
		}
	});
};