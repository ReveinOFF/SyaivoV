const express = require("express"),
  router = express.Router(),
  pool = require("../service/db"),
  authenticateToken = require("./authentication"),
  fs = require("fs"),
  util = require("util"),
  multer = require("multer"),
  { randomUUID } = require("crypto");

const removeFileAsync = util.promisify(fs.rm);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const newNameFile = randomUUID();
    cb(null, newNameFile + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.get("/:key", async (req, res) => {
  const key = req.params.key;

  try {
    const listCatalog = await pool.query(
      `SELECT sc.id, sc.image, sc.name
	FROM subcatalog as sc
	JOIN catalog as c ON sc.catalog_id = c.id
	WHERE c.key_name = '${key}';`
    );

    if (listCatalog.rows.length > 0)
      return res.status(200).json(listCatalog.rows);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    if (!req.auth) return res.status(401).json("Ви не авторизовані");
    const { name, catalog_key } = req.body;
    if (!req.body) return res.status(404).json("Данні не були введені!");
    try {
      const idCatalog = await pool.query(
        `SELECT id
    FROM catalog
    WHERE key_name = '${catalog_key}'
    LIMIT 1;`
      );

      if (!idCatalog) return res.status(404).json("Каталог не знайдено!");

      await pool.query(
        `INSERT INTO subcatalog(
    image, name, catalog_id)
    VALUES ('${req.file.filename}', '${name}', ${idCatalog.rows[0].id});`
      );
      return res.status(201).json("Каталог створено!");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Помилка створення каталога!");
    }
  }
);

router.delete("/:id", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const id = req.params.id;

  if (!id) return res.status(404).json("Каталог не знайдено!");

  try {
    const result = await pool.query(
      `SELECT * FROM subcatalog WHERE id = ${id} LIMIT 1;`
    );

    await pool.query(`DELETE FROM subcatalog WHERE id = ${id};`);

    const filePath = `public/${result.rows[0].image}`;

    if (fs.existsSync(filePath)) await removeFileAsync(filePath);

    return res.status(200).json("Каталог видалено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка видалення каталога!");
  }
});

module.exports = router;
