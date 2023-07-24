const { isValidName } = require("./helpers")

function isValidEntity(entity) {
	try {
		if (!entity) {
			throw new Error("entity is not defined")
		}

		if (typeof entity !== "string") {
			throw new Error("entity must be a string")
		}

		if (!isValidName(entity)) {
			throw new Error(`entity name '${entity}' is invalid`)
		}

		return entity
	} catch (error) {
		throw new Error(error.message)
	}
}

function areValidAttributes(attributes) {
	try {
		if (
			typeof attributes !== "object" ||
			attributes === null ||
			Array.isArray(attributes)
		) {
			throw new Error("attributes must be an object")
		}

		if (Object.keys(attributes).length === 0) {
			throw new Error("no attributes were sent")
		}

		return attributes
	} catch (error) {
		throw new Error(error.message)
	}
}

function areValidFilters(filters) {
	try {
		if (filters === undefined) {
			throw new Error("filters is not defined")
		}

		if (
			typeof filters !== "object" ||
			filters === null ||
			Array.isArray(filters)
		) {
			throw new Error("filters must be an object")
		}

		return filters
	} catch (error) {
		throw new Error(error.message)
	}
}

function isValidReturning(returning) {
	try {
		if (
			typeof returning !== "object" ||
			returning === null ||
			Array.isArray(returning)
		) {
			throw new Error("returning must be an object")
		}

		returning.return = isValidReturn(returning.return)
		returning.fields = areValidFields(returning.fields)

		return returning
	} catch (error) {
		throw new Error(error.message)
	}
}

function isValidReturn(_return) {
	try {
		if (_return === undefined) {
			throw new Error("return is not defined")
		}

		if (typeof _return !== "boolean") {
			throw new Error("return must be a boolean")
		}

		return _return
	} catch (error) {
		throw new Error(error.message)
	}
}

function areValidFields(fields) {
	try {
		if (!fields) {
			throw new Error("fields is not defined")
		}

		if (!Array.isArray(fields)) {
			throw new Error("fields must be an array")
		}

		if (fields.length > 0) {
			for (let i = 0; i < fields.length; i++) {
				const field = fields[i]
				if (!isValidName(field)) {
					throw new Error(`field ${i + 1} name '${field}' is invalid`)
				}
			}
		}

		return fields
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = {
	areValidAttributes,
	areValidFields,
	areValidFilters,
	isValidEntity,
	isValidReturning,
}
