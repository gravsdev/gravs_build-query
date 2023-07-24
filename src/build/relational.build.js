class RelationalBuild {
	constructor(driver) {
		this.driver = driver
	}

	select(entity, fields, filters) {
		let query = `SELECT ${
			fields
				.map((field) => {
					return `${entity}.${field}`
				})
				.join(", ") || "*"
		} FROM ${entity}`

		if (Object.keys(filters).length > 0) {
			const subquery = ` WHERE ${Object.keys(filters)
				.map((value, index) =>
					this.driver === "postgres"
						? `${value} = $${index + 1}`
						: `${value} = ?`,
				)
				.join(" AND ")}`

			query += subquery
		}

		return query
	}

	insert(entity, attributes, returning) {
		let query = `INSERT INTO ${entity} (${Object.keys(attributes)
			.map((value) => value)
			.join(", ")}) VALUES (${Object.keys(attributes)
			.map((_, index) => (this.driver === "postgres" ? `$${index + 1}` : "?"))
			.join(", ")})`

		if (returning.return) {
			if (this.driver === "postgres") {
				const subquery = ` RETURNING ${
					returning.fields.map((field) => field).join(", ") || "*"
				}`
				query += subquery

				return query
			}
		}

		return query
	}

	update(entity, attributes, filters, returning) {
		let query = `UPDATE ${entity} SET ${Object.keys(attributes)
			.map((value, index) =>
				this.driver === "postgres"
					? `${value} = $${index + 1}`
					: `${value} = ?`,
			)
			.join(", ")}`

		query += ` WHERE ${Object.keys(filters)
			.map((value) => {
				if (typeof filters[value] === "string") {
					return `${value} = '${filters[value]}'`
				}
				return `${value} = ${filters[value]}`
			})
			.join(" AND ")}`

		if (returning.return) {
			if (this.driver === "postgres") {
				const subquery = ` RETURNING ${
					returning.fields.map((field) => field).join(", ") || "*"
				}`
				query += subquery

				return query
			}
		}

		return query
	}

	remove(entity, filters, returning) {
		let query = `DELETE FROM ${entity} WHERE ${Object.keys(filters)
			.map((value, index) =>
				this.driver === "postgres"
					? `${value} = $${index + 1}`
					: `${value} = ?`,
			)
			.join(" AND ")}`

		if (returning.return) {
			if (this.driver === "postgres") {
				const subquery = ` RETURNING ${
					returning.fields.map((field) => field).join(", ") || "*"
				}`
				query += subquery

				return query
			}
		}

		return query
	}
}

module.exports = RelationalBuild
