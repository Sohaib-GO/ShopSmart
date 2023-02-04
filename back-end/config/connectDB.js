// PG database client/connection setup
require("dotenv").config();

const { Pool } = require("pg");

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const pool = new Pool(dbParams);

pool.connect()
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("error connecting to database", err));

module.exports = pool;
 