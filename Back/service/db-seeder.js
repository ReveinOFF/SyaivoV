const mysql = require("mysql2"),
  fs = require("fs");

require("dotenv").config();

const seedQuery = fs.readFileSync("./database.sql", {
  encoding: "utf-8",
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "usersdb2",
  password: "123456",
  multipleStatements: true,
});

connection.connect();

connection.query(seedQuery, (err) => {
  if (err) throw err;

  console.log("SQL seed completed!");
  connection.end();
});
