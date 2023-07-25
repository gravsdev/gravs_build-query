const Build = require("../build")
const { drivers } = require("../utils/helpers")

class Compile {
	constructor(client, driver) {
		this.client = client
		this.driver = driver
	}

	async find(entity, fields, filters) {
		try {
			const build = new Build(this.driver)

			const query = build.select(entity, fields, filters)
			const data = await this.client.query(query, Object.values(filters))

			let rowsData
			switch (this.driver) {
				case drivers[0]:
					rowsData = data.rows
					break
				case drivers[1]:
					rowsData = data[0]
					break
				default:
					rowsData = undefined
					break
			}

			return rowsData
		} catch (error) {
			throw new Error(error.message)
		}
	}

	async create(entity, attributes, returning) {
		try {
			const build = new Build(this.driver)
			let affectedRows = 0
			let rowsData

			const query = build.insert(entity, attributes, returning)
			const data = await this.client.query(query, Object.values(attributes))

			switch (this.driver) {
				case drivers[0]:
					affectedRows += data.rowCount
					if (returning.return) {
						rowsData = data.rows[0]
					}
					break
				case drivers[1]:
					affectedRows += data[0].affectedRows
					if (returning.return) {
						rowsData =
							affectedRows !== 0
								? "returning not available in mysql"
								: undefined
					}
					break
				default:
					rowsData = undefined
					break
			}

			return { affectedRows, rowsData }
		} catch (error) {
			throw new Error(error.message)
		}
	}

	async update(entity, attributes, filters, returning) {
		try {
			const build = new Build(this.driver)
			let affectedRows = 0
			let rowsData

			const query = build.update(entity, attributes, filters, returning)
			const data = await this.client.query(query, Object.values(attributes))

			switch (this.driver) {
				case drivers[0]:
					affectedRows += data.rowCount
					if (returning.return) {
						rowsData = data.rows[0]
					}
					break
				case drivers[1]:
					affectedRows += data[0].affectedRows
					if (returning.return) {
						rowsData =
							affectedRows !== 0
								? "returning not available in mysql"
								: undefined
					}
					break
				default:
					rowsData = undefined
					break
			}

			return { affectedRows, rowsData }
		} catch (error) {
			throw new Error(error.message)
		}
	}

	async remove(entity, filters, returning) {
		try {
			const build = new Build(this.driver)
			let affectedRows = 0
			let rowsData

			const query = build.remove(entity, filters, returning)
			const data = await this.client.query(query, Object.values(filters))

			switch (this.driver) {
				case drivers[0]:
					affectedRows += data.rowCount
					if (returning.return) {
						rowsData = data.rows[0]
					}
					break
				case drivers[1]:
					affectedRows += data[0].affectedRows
					if (returning.return) {
						rowsData =
							affectedRows !== 0
								? "returning not available in mysql"
								: undefined
					}
					break
				default:
					rowsData = undefined
					break
			}

			return { affectedRows, rowsData }
		} catch (error) {
			throw new Error(error.message)
		}
	}
}

module.exports = Compile
