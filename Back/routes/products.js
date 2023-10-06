const express = require("express"),
  router = express.Router(),
  pool = require("../service/db"),
  authenticateToken = require("./authentication");

router.post("/", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  if (!req.body) return res.status(404).json("Данні не були введені!");

  const {
    image,
    name,
    price,
    description,
    color,
    fabric,
    fabric_warehouse,
    size,
    catalog_id,
    subcatalog_id,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO product (image, name, price, description, color, fabric, fabric_warehouse, size, date_created, catalog_id, subcatalog_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        image,
        name,
        price,
        description,
        color,
        fabric,
        fabric_warehouse,
        size,
        new Date(),
        catalog_id,
        subcatalog_id,
      ]
    );

    res.status(201).json("Продукт створено!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Помилка в створені продукта!");
  }
});

router.get("/", async (req, res) => {
  const listProduct = await pool.query(
    `SELECT p.id, p.name, p.description, p.price
	FROM product as p
	JOIN catalog as c ON p.catalog_id = c.id
	LEFT JOIN subcatalog as sc ON p.subcatalog_id = sc.id
	WHERE p.catalog_id = 1
	ORDER BY p.name ASC
	LIMIT 10 OFFSET 0;`
  );

  return res.status(200).json(listProduct.rows);
});

router.get("/:id", async (req, res) => {
  try {
    const listProduct = await pool.query(
      `SELECT p.*, 
	c.name as catalog_name, c.key_name as catalog_key_name,
	sc.name as subcatalog_name, sc.key_name as subcatalog_key_name
	FROM product as p
	JOIN catalog as c ON p.catalog_id = c.id
	LEFT JOIN subcatalog as sc ON p.subcatalog_id = sc.id
	WHERE p.id = ${req.params.id}
	LIMIT 1;`
    );

    if (listProduct.rows.length > 0)
      return res.status(200).json(listProduct.rows[0]);
    else return res.status(404).json("Товар не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку товара!");
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const productId = req.params.id;

  try {
    await pool.query(`DELETE FROM product WHERE id = $1;`, [productId]);

    return res.status(200).json("Товар видалено!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Помилка в створені продукта!");
  }
});

module.exports = router;
