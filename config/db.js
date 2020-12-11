const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'gamerhaven',
	password: 'password',
	port: 5432,
  })
  module.exports = pool;
// Connecting to database