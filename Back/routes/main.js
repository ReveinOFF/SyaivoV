const express = require("express"),
  router = express.Router(),
  pool = require("../service/db");

router.get("/", async (req, res) => {
  const [rows, fields] = await pool.execute(
    `SELECT id, image, name, price
	FROM product
	ORDER BY date_created DESC
	LIMIT 5;`
  );

  if (rows.length > 0) return res.status(200).json(rows);
  else return res.status(404).json("Товари не знайдено!");
});

module.exports = router;
