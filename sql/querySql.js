// sql module imports
const { Pool, Client } = require('pg')
const format = require('pg-format');

const pool = new Pool()


// function to query database
const querySql = (sql, callback) => {
	pool.query(sql, (error, result) => {
		if (error) throw error

		callback(result.rows)
	})
}

module.exports = querySql;