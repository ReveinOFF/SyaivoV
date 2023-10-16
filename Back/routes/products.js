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

const getTotalPage = async (type, catalog) => {
  try {
    let countPage = `SELECT COUNT(p.id)
	FROM product as p
	JOIN catalog as c ON p.catalog_id = c.id
	LEFT JOIN subcatalog as sc ON p.subcatalog_id = sc.id`;

    if (catalog) countPage += `\nWHERE c.key_name = '${catalog}'`;
    if (type) {
      if (catalog) {
        countPage += `\nAND p.subcatalog_id = ${type}`;
      } else {
        countPage += `\nWHERE p.subcatalog_id = ${type}`;
      }
    }

    countPage += `;`;

    const { rows } = await pool.query(countPage);

    const totalPage = Math.ceil(parseInt(rows[0].count) / 10);

    return totalPage;
  } catch (error) {
    console.log(error);
    throw new Error("Помилка під час отримання загальної кількості сторінок.");
  }
};

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    if (!req.auth) return res.status(401).json("Ви не авторизовані");

    if (!req.body) return res.status(404).json("Данні не були введені!");

    const {
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
        `INSERT INTO product (image, name, price, description, color, fabric, fabric_warehouse, size, date_created, catalog_id, subcatalog_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [
          req.file ? req.file.filename : null,
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
  }
);

router.get("/", async (req, res) => {
  const { page, type, catalog, sort } = req.query;
  const currPage = parseInt(page) - 1 || 0;

  try {
    let listProduct = `SELECT p.id, p.image, p.name, p.description, p.price
	FROM product as p
	JOIN catalog as c ON p.catalog_id = c.id
	LEFT JOIN subcatalog as sc ON p.subcatalog_id = sc.id`;

    if (catalog) listProduct += `\nWHERE c.key_name = '${catalog}'`;
    if (type) {
      if (catalog) {
        listProduct += `\nAND p.subcatalog_id = ${type}`;
      } else {
        listProduct += `\nWHERE p.subcatalog_id = ${type}`;
      }
    }

    if (sort) {
      switch (sort) {
        case "new":
          listProduct += `\nORDER BY p.date_created DESC`;
          break;
        case "name-a":
          listProduct += `\nORDER BY p.name ASC`;
          break;
        case "name-b":
          listProduct += `\nORDER BY p.name DESC`;
          break;
        case "price-a":
          listProduct += `\nORDER BY p.price ASC`;
          break;
        case "price-b":
          listProduct += `\nORDER BY p.price DESC`;
          break;
        default:
          break;
      }
    }

    listProduct += `\nLIMIT 10 OFFSET ${currPage * 10};`;

    const { rows } = await pool.query(listProduct);

    const totalPage = await getTotalPage(type, catalog);

    return res.status(200).json({
      products: rows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Ошибка виведення товарів!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.*, 
	c.name as catalog_name, c.key_name as catalog_key_name,
	sc.name as subcatalog_name, sc.key_name as subcatalog_key_name
	FROM product as p
	JOIN catalog as c ON p.catalog_id = c.id
	LEFT JOIN subcatalog as sc ON p.subcatalog_id = sc.id
	WHERE p.id = ${req.params.id}
	LIMIT 1;`
    );

    if (rows.length > 0) return res.status(200).json(rows[0]);
    else return res.status(404).json("Товар не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку товара!");
  }
});

router.get("/search/:name", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, image, name, description
	FROM product
	WHERE name ILIKE '%${req.params.name}%';`
    );

    if (rows.length > 0) return res.status(200).json(rows);
    else return res.status(404).json("Товар не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку товара!");
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const productId = parseInt(req.params.id);

  try {
    const { rows } = await pool.query(
      `SELECT * FROM product WHERE id = ${productId} LIMIT 1;`
    );

    await pool.query(`DELETE FROM product WHERE id = ${productId};`);

    const filePath = `public/${rows[0].image}`;

    if (fs.existsSync(filePath)) await removeFileAsync(filePath);

    return res.status(200).json("Товар видалено!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Помилка в створені продукта!");
  }
});

router.put(
  "/:id",
  upload.single("image"),
  authenticateToken,
  async (req, res) => {
    if (!req.auth) return res.status(401).json("Ви не авторизовані");

    if (!req.body) return res.status(404).json("Данні не були введені!");

    const {
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
      let updateQuery = `UPDATE product
        SET name = ${name},
        SET price = ${price},
        SET description = ${description},
        SET color = ${color},
        SET fabric = ${fabric},
        SET fabric_warehouse = ${fabric_warehouse},
        SET size = ${size},
        SET catalog_id = ${catalog_id},
        SET subcatalog_id = ${subcatalog_id}`;

      if (req.file) {
        const { rows } = await pool.query(
          `SELECT image FROM product WHERE id = ${req.params.id};`
        );
        if (rows.length > 0) {
          const filePath = `public/${rows[0].image}`;

          if (fs.existsSync(filePath)) await removeFileAsync(filePath);

          updateQuery += `\nSET image = ${req.file.filename}`;
        }
      }

      updateQuery += `\nWHERE id = ${req.params.id};`;

      await pool.query(updateQuery);

      return res.status(201).json("Товар обновленно!");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Помилка зміни товара!");
    }
  }
);

module.exports = router;
