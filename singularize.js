// This function only needs to worry about
// removing the 's' off the end of the stripe API
// methods to make them singular

module.exports = string => {
	if (string.charAt(string.length - 1) !== 's') {
		return string;
	}

	return string.substr(0, string.length - 1);
};