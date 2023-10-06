const express = require("express"),
  router = express.Router(),
  pool = require("../service/db");

router.get("/", async (req, res) => {
  const listProduct = await pool.query(
    `SELECT id, image, name, price
	FROM product
	ORDER BY date_created DESC
	LIMIT 5;`
  );

  return res.status(200).json(listProduct.rows);
});

module.exports = router;
