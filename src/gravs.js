const Driver = require("./driver")
const Query = require("./query")
const alert = require("./utils/error")

class Gravs {
	async connect(config) {
		try {
			const database = new Driver(config)

			this.client = database.connectDriver()
			this.driver = config.driver
			await database.isValidConnection(this.client)

			return alert(`connected to ${config.driver}`)
		} catch (error) {
			return alert(`can't connect to ${config.driver}`, "error")
		}
	}

	async find({ entity, fields, filters = {} }) {
		try {
			const query = new Query(this.client, this.driver)
			const data = await query.find({ entity, fields, filters })

			return data
		} catch (error) {
			throw alert(error.message, "error")
		}
	}

	async create({
		entity,
		attributes,
		returning = { return: false, fields: [] },
	}) {
		try {
			const query = new Query(this.client, this.driver)
			const data = await query.create({ entity, attributes, returning })

			return data
		} catch (error) {
			throw alert(error.message, "error")
		}
	}

	async update({
		entity,
		attributes,
		filters,
		returning = { return: false, fields: [] },
	}) {
		try {
			const query = new Query(this.client, this.driver)
			const data = await query.update({
				entity,
				attributes,
				filters,
				returning,
			})

			return data
		} catch (error) {
			throw alert(error.message, "error")
		}
	}

	async remove({ entity, filters, returning = { return: false, fields: [] } }) {
		try {
			const query = new Query(this.client, this.driver)
			const data = await query.remove({ entity, filters, returning })

			return data
		} catch (error) {
			throw alert(error.message, "error")
		}
	}
}

module.exports = new Gravs()
