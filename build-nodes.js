var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const crypto = require('crypto');
const singularize = require('./singularize');

module.exports = object => {

	// Save the type in a variable for
	// use later, make it singular if necessary,
	// then delete it from the object
	const type = singularize(object.type);
	delete object.type;

	// Use object rest to add all of the object's
	// keys and values to node object, then
	// add the rest of the keys that Gatsby needs

	console.log(`Building node of type: "${type}" with id: "${object.id}"`);

	return _extends({}, object, {
		parent: null,
		children: [],
		internal: {
			type: `Stripe${type}`,
			content: JSON.stringify(object),
			contentDigest: crypto.createHash('md5').update(JSON.stringify(object)).digest('hex')
		}
	});
};