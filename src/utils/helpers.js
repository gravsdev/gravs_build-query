const drivers = ["postgres", "mysql"]

function isValidName(name) {
	const nameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/

	if (!nameRegex.test(name)) {
		return false
	}

	return true
}

function isArrayOfObjects(arrayObject) {
	if (Array.isArray(arrayObject)) {
		for (let i = 0; i < arrayObject.length; i++) {
			if (
				typeof arrayObject[i] !== "object" ||
				arrayObject[i] === null ||
				Array.isArray(arrayObject[i])
			) {
				return false
			}
		}
		return true
	}
	return false
}

module.exports = {
	drivers,
	isValidName,
	isArrayOfObjects,
}
