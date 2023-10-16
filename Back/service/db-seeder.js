const pg = require("pg"),
  fs = require("fs"),
  path = require("path");

require("dotenv").config();

const filePath = path.join(__dirname, "database.sql");
const seedQuery = fs.readFileSync(filePath, {
  encoding: "utf-8",
});

const connection = new pg.Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

const parseSqlFile = (sqlFile) => {
  return sqlFile
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, " ")
    .split(";");
};

async function seedDatabase() {
  try {
    await connection.connect();
    console.log("Успішне підключення до бази даних!");

    const seedQueries = parseSqlFile(seedQuery);

    for (const query of seedQueries) {
      if (query) {
        console.log("Виконується запит: ", query);
        await connection.query(query);
      }
    }
    connection.end();
  } catch (error) {
    console.error("Помилка виконання SQL-запитів: ", err);
  } finally {
    connection.end();
  }
}

seedDatabase();
