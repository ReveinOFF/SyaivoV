const express = require("express"),
  app = express(),
  jwt = require("jsonwebtoken"),
  cors = require("cors"),
  transporter = require("./service/mailer"),
  pool = require("./service/db"),
  fs = require("fs"),
  util = require("util");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

const readFileAsync = util.promisify(fs.readFile);

const emailStatic = process.env.EMAIL_TO,
  tokenKeyAuth = process.env.JWT_SECRET,
  port = process.env.S_PORT,
  host = process.env.S_HOST;

function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send("Доступ заборонено.");
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, tokenKeyAuth, (err, auth) => {
    if (err) return res.status(403).send("Недійсний токен");
    req.auth = auth;
    next();
  });
}

app.post("/api/product", authenticateToken, async (req, res) => {
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

app.get("/api/products", async (req, res) => {
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

app.get("/api/newproducts", async (req, res) => {
  const listProduct = await pool.query(
    `SELECT id, image, name, price
	FROM product
	ORDER BY date_created DESC
	LIMIT 5;`
  );

  return res.status(200).json(listProduct.rows);
});

app.get("/api/product/:id", async (req, res) => {
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
      return res.status(200).json(listProduct.rows);
    else return res.status(404).json("Товар не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку товара!");
  }
});

app.get("/api/subcatalog/:key", async (req, res) => {
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

app.post("/api/subcatalog", authenticateToken, async (req, res) => {
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

    const сatalog = await pool.query(
      `INSERT INTO subcatalog(
	image, name, catalog_id)
	VALUES (${image}, ${name}, ${idCatalog});`
    );

    if (сatalog.rows.length > 0) return res.status(200).json(listCatalog.rows);
    else return res.status(200).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

app.put("/api/product/:id", authenticateToken, async (req, res) => {
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
  const productId = req.params.id;

  try {
    const updateQuery =
      "UPDATE product SET image = $1, name = $2, price = $3, description = $4, color = $5, fabric = $6, fabric_warehouse = $7, size= $8, catalog_id = $9, subcatalog_id = $10 WHERE id = $11";
    await pool.query(updateQuery, [
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
      productId,
    ]);

    return res.status(200).json("Товар обновлено!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Помилка в створені продукта!");
  }
});

app.delete("/api/product/:id", authenticateToken, async (req, res) => {
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

app.post("/api/auth", (req, res) => {
  if (!req.body || !req.body.login || !req.body.password)
    res.status(404).json("Потрібно ввести дані!");

  const { login, password } = req.body;

  try {
    if (login == process.env.ADMIN_LOGIN && password == process.env.ADMIN_PASS)
      return res
        .status(200)
        .json(jwt.sign({ email: emailStatic, login: login }, tokenKeyAuth));
    else return res.status(404).json("Ви ввели неправильні дані!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка аторизації!");
  }
});

app.post("/api/message", async (req, res) => {
  if (!req.body || !Object.keys(req.body).length)
    res.status(404).json("Введіть данні!");

  const { name, email, phone, subject, message } = req.body;

  if ((!email || !phone) && (!name || !subject || !message))
    res.status(404).json("Ви ввели не всі необхідні дані!");

  try {
    const data = await readFileAsync("./email-pages/message.html", "utf8");
    const updateBody = message.replace(/\n/g, "<br/>");
    const updatedHtml = data
      .replace("%name", name)
      .replace("%email", email)
      .replace("%phone", phone)
      .replace("%subject", subject)
      .replace("%body", updateBody);

    await transporter.sendMail({
      from: emailStatic,
      to: "ronnieplayyt@gmail.com",
      subject: `СЯЙВО-В - ${subject}`,
      html: updatedHtml,
    });

    res.status(201).json("Відправлено повідомлення!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Виникла помилка при відправці повідомлення!");
  }
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
