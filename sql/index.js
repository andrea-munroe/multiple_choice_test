if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: '../.env' });
};

const { Pool } = require('pg')

const pool = new Pool()


module.exports = {
  query: (text, params) => pool.query(text, params),
}