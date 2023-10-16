const express = require("express"),
  router = express.Router(),
  pool = require("../service/db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.*,
		CASE WHEN EXISTS (SELECT sc.id FROM subcatalog as sc WHERE sc.catalog_id = c.id) THEN 1
		ELSE 0
		END AS has_subcatalog,
       json_agg(json_build_object('subcatalog_id', s.id, 'subcatalog_name', s.name)) AS subcatalogs
    FROM catalog c
    LEFT JOIN subcatalog s ON c.id = s.catalog_id
    GROUP BY c.id, c.name, c.key_name;`
    );

    if (rows.length > 0) return res.status(200).json(rows);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.get("/only", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM catalog;`);

    if (rows.length > 0) return res.status(200).json(rows);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

module.exports = router;
