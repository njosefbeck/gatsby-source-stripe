var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = object => {

	if (!object.data.length) {
		console.error(`Not building node out of object type: ${object.type} because it has no data.`);
		return;
	}

	return _extends({}, object.data);
};