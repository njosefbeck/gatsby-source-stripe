module.exports = async (stripe, object, objectName, methodName) => {
	// Check if object has empty data array. If it is
	// empty, then just return its data
	if (!object.data.length) {
		return object.data;
	}

	let hasMore = object.has_more;

	// Check if object has more data to fetch. If not,
	// then return its data
	if (!hasMore) {
		return object.data;
	}

	let lastDataItemId = object.data[object.data.length - 1].id;

	// Paginate through as many objects as needed in order to
	// get all of the data.
	while (hasMore) {
		const nextObject = await stripe[objectName][methodName]({ starting_after: lastDataItemId });
		object.data.push(...nextObject.data);

		lastDataItemId = nextObject.data[nextObject.data.length - 1].id;
		hasMore = nextObject.has_more;
	}

	return object.data;
};