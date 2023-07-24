const Compile = require("../compile")
const {
	isValidEntity,
	areValidFields,
	areValidFilters,
	areValidAttributes,
	isValidReturning,
} = require("../utils/valids")

class Query {
	constructor(client, driver) {
		this.client = client
		this.driver = driver
	}

	async find({ entity, fields, filters }) {
		try {
			const compile = new Compile(this.client, this.driver)

			entity = isValidEntity(entity)
			fields = areValidFields(fields)
			filters = areValidFilters(filters)

			const data = await compile.find(entity, fields, filters)

			return data
		} catch (error) {
			throw new Error(error.message)
		}
	}

	async create({ entity, attributes, returning }) {
		try {
			const compile = new Compile(this.client, this.driver)

			entity = isValidEntity(entity)
			attributes = areValidAttributes(attributes)
			returning = isValidReturning(returning)

			const data = await compile.create(entity, attributes, returning)

			return data
		} catch (error) {
			throw new Error(error.message)
		}
	}

	async update({ entity, attributes, filters, returning }) {
		try {
			const compile = new Compile(this.client, this.driver)

			entity = isValidEntity(entity)
			attributes = areValidAttributes(attributes)
			filters = areValidFilters(filters)

			if (Object.keys(filters).length === 0) {
				throw new Error("no filters were sent")
			}

			returning = isValidReturning(returning)

			const data = await compile.update(entity, attributes, filters, returning)

			return data
		} catch (error) {
			throw new Error(error.message)
		}
	}

	async remove({ entity, filters, returning }) {
		try {
			const compile = new Compile(this.client, this.driver)

			entity = isValidEntity(entity)
			filters = areValidFilters(filters)

			if (Object.keys(filters).length === 0) {
				throw new Error("no filters were sent")
			}

			returning = isValidReturning(returning)

			const data = await compile.remove(entity, filters, returning)

			return data
		} catch (error) {
			throw new Error(error.message)
		}
	}
}

module.exports = Query
