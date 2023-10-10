const mysql = require("mysql2"),
  fs = require("fs"),
  path = require("path");

require("dotenv").config();

const filePath = path.join(__dirname, "database.sql");
const seedQuery = fs.readFileSync(filePath, {
  encoding: "utf-8",
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

connection.connect();

const parseSqlFile = (sqlFile) => {
  return sqlFile
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, " ")
    .split(";");
};

const seed = parseSqlFile(seedQuery);

seed.forEach((element) => {
  if (element) {
    connection.query(element, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("SQL seed completed!");
    });
  }
});

connection.end();

return;
