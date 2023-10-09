// const mysql = require("mysql2");
const Pool = require("pg").Pool;
require("dotenv").config();

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "usersdb2",
//   password: "123456",
// });

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;
