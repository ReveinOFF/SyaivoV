const express = require("express"),
  router = express.Router(),
  pool = require("../service/db"),
  authenticateToken = require("./authentication");

router.get("/:key", async (req, res) => {
  try {
    const listCatalog = await pool.query(
      `SELECT sc.*, c.name as name_catalog
	FROM subcatalog as sc
	JOIN catalog as c ON c.id = sc.catalog_id
	WHERE c.key_name = ${req.params.key};`
    );

    if (listCatalog.rows.length > 0)
      return res.status(200).json(listCatalog.rows);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.post("/", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const { image, name, catalog_key } = req.body;

  if (!req.body) return res.status(404).json("Данні не були введені!");

  try {
    const idCatalog = await pool.query(
      `SELECT id
	FROM catalog
	WHERE key_name = ${catalog_key};`
    );

    if (!idCatalog) return res.status(404).json("Каталог не знайдено!");

    await pool.query(
      `INSERT INTO subcatalog(
	image, name, catalog_id)
	VALUES (${image}, ${name}, ${idCatalog});`
    );

    return res.status(200).json("Каталог створено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const id = req.params.id;

  if (!id) return res.status(404).json("Каталог не знайдено!");

  try {
    await pool.query(`DELETE FROM subcatalog WHERE id = ${id};`);

    return res.status(200).json("Каталог видалено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталога!");
  }
});

module.exports = router;
