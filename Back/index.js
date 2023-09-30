const express = require("express"),
  app = express(),
  jwt = require("jsonwebtoken"),
  cors = require("cors"),
  transporter = require("./service/mailer"),
  pool = require("./service/db"),
  fs = require("fs");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));

const emailStatic = process.env.EMAIL_TO,
  tokenKeyAuth = process.env.JWT_SECRET_AUTH,
  tokenKeyConf = process.env.JWT_SECRET_CONF,
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

app.post("/api/product", async (req, res) => {
  // if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const { image, name, description, catalog_id } = req.body;

  await pool.query(
    `INSERT INTO product (image, name, description, catalog_id) values ($1, $2, $3, $4) RETURNING *`,
    [image, name, description, catalog_id]
  );

  res.status(201).json("Продукт створено!");
});

app.get("/api/products", async (req, res) => {
  const listProduct = await pool.query("SELECT * FROM product;");

  return res.status(200).json(listProduct.rows);
});

app.get("/api/product/:id", async (req, res) => {
  const listProduct = await pool.query(
    `SELECT * FROM product WHERE id = ${req.params.id} LIMIT 1;`
  );

  return res.status(200).json(listProduct.rows);
});

app.put("/api/product/:id", async (req, res) => {
  const { image, name, description } = req.body;
  const productId = req.params.id;

  const updateQuery =
    "UPDATE product SET image = $1, name = $2, description = $3 WHERE id = $4";
  await pool.query(updateQuery, [image, name, description, productId]);

  return res.status(200).json("Товар обновлено!");
});

app.delete("/api/product/:id", async (req, res) => {
  const productId = req.params.id;

  await pool.query(`DELETE FROM product WHERE id = $1;`, [productId]);

  return res.status(200).json("Товар видалено!");
});

app.post("/api/auth/send", async (req, res) => {
  const { email } = req.body;

  if (email === emailStatic) {
    const token = jwt.sign({ email: emailStatic }, tokenKeyConf, {
      expiresIn: 600,
    });

    const html = await fs.readFile("./email-pages/auth.html", "utf8");
    const updatedHtml = html.replace(
      "%link",
      `http://127.0.0.1:3000/auth?token=${token}`
    );

    await transporter.sendMail({
      from: emailStatic,
      to: "ronnieplayyt@gmail.com",
      subject: "Підтвердження авторизації",
      html: updatedHtml,
    });

    res.status(200).json("Відправлено повідомлення на пошту для підтвердження");
  } else res.status(404).json("Користувача не знайдено!");
});

app.post("/api/auth/confirm", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, tokenKeyConf, (err, data) => {
    if (err) return res.status(401).json("Токен не є дійсним!");
    else if (data)
      return res
        .status(200)
        .json(jwt.sign({ email: emailStatic }, tokenKeyAuth));
  });
});

app.post("/api/message", async (req, res) => {
  const { name, email, phone, subject, body } = req.body;

  await fs.readFile("./email-pages/message.html", "utf8", async (err, data) => {
    const updateBody = body.replace(/\n/g, "<br/>");

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

    res.status(200).json("Відправлено повідомлення!");
  });
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
