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
  try {
    const token = jwt.sign({ email: emailStatic }, tokenKeyConf, {
      expiresIn: 600,
    });

    const html = await readFileAsync("./email-pages/auth.html", "utf8");
    const updatedHtml = html.replace(
      "%link",
      `http://127.0.0.1:3000/admin/confirm?token=${token}`
    );

    await transporter.sendMail({
      from: emailStatic,
      to: "ronnieplayyt@gmail.com",
      subject: "Підтвердження авторизації",
      html: updatedHtml,
    });

    res
      .status(200)
      .json("Відправлено повідомлення на пошту для підтвердження авторизації");
  } catch (error) {
    console.log(error);
    res.status(500).json("Виникла помилка при відправці повідомлення!");
  }
});

app.post("/api/auth/confirm", (req, res) => {
  if (!req.body || !Object.keys(req.body).length || !req.body.token)
    res.status(404).json("Токен не знайдено!");

  const { token } = req.body;

  jwt.verify(token, tokenKeyConf, async (err, data) => {
    if (err) return res.status(401).json("Токен не є дійсним!");
    else if (data) {
      try {
        const html = await readFileAsync("./email-pages/confirm.html", "utf8");

        await transporter.sendMail({
          from: emailStatic,
          to: "ronnieplayyt@gmail.com",
          subject: "Підтвердження авторизації",
          html: html,
        });

        return res
          .status(200)
          .json(jwt.sign({ email: emailStatic }, tokenKeyAuth));
      } catch (error) {
        console.error(error);
        return res.status(500).json("Помилка сервера");
      }
    }
  });
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

    res.status(200).json("Відправлено повідомлення!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Виникла помилка при відправці повідомлення!");
  }
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
