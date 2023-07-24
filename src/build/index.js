const { drivers } = require("../utils/helpers")
const RelationalBuild = require("./relational.build")

class Build {
	constructor(driver) {
		this.driver = driver
	}

	select(entity, fields, filters) {
		try {
			const relationalBuild = new RelationalBuild(this.driver)

			if (!drivers.includes(this.driver)) {
				throw new Error(`driver '${this.driver}' is not available`)
			}

			const query = relationalBuild.select(entity, fields, filters)

			return query
		} catch (error) {
			throw new Error(error.message)
		}
	}

	insert(entity, attributes, returning) {
		try {
			const relationalBuild = new RelationalBuild(this.driver)

			if (!drivers.includes(this.driver)) {
				throw new Error(`driver '${this.driver}' is not available`)
			}

			const query = relationalBuild.insert(entity, attributes, returning)

			return query
		} catch (error) {
			throw new Error(error.message)
		}
	}

	update(entity, attributes, filters, returning) {
		try {
			const relationalBuild = new RelationalBuild(this.driver)

			if (!drivers.includes(this.driver)) {
				throw new Error(`driver '${this.driver}' is not available`)
			}

			const query = relationalBuild.update(
				entity,
				attributes,
				filters,
				returning,
			)

			return query
		} catch (error) {
			throw new Error(error.message)
		}
	}

	remove(entity, filters, returning) {
		try {
			const relationalBuild = new RelationalBuild(this.driver)

			if (!drivers.includes(this.driver)) {
				throw new Error(`driver '${this.driver}' is not available`)
			}

			const query = relationalBuild.remove(entity, filters, returning)

			return query
		} catch (error) {
			throw new Error(error.message)
		}
	}
}

module.exports = Build
