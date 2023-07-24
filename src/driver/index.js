const { drivers } = require("../utils/helpers")

class Driver {
	constructor(config) {
		this.config = config
	}

	postgres() {
		const { Pool } = require("pg")
		const client = new Pool(this.config.config)

		return client
	}

	mysql() {
		const { createPool } = require("mysql2")
		const client = createPool(this.config.config).promise()

		return client
	}

	connectDriver() {
		if (this.config.driver === "postgres") {
			return this.postgres()
		} else if (this.config.driver === "mysql") {
			return this.mysql()
		}
	}

	async isValidConnection(client) {
		if (drivers.includes(this.config.driver)) {
			await client.query("SELECT 1")
		}
	}
}

module.exports = Driver
