const express = require("express"),
  app = express(),
  jwt = require("jsonwebtoken"),
  cors = require("cors"),
  nodemailer = require("nodemailer"),
  Pool = require("pg").Pool,
  host = "127.0.0.1",
  port = 7000;

require("dotenv").config();

const emailStatic = process.env.EMAIL,
  tokenKeyAuth = process.env.JWT_SECRET_AUTH,
  tokenKeyConf = process.env.JWT_SECRET_CONF;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_TO,
    pass: process.env.EMAIL_PASS,
  },
});

const pool = new Pool({
  user: "",
  password: "",
  host: "",
  port: "",
  database: "",
});

app.use(cors());
app.use(express.json());

// function authenticateToken(req, res, next) {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).send("Доступ запрещен");

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.status(403).send("Недействительный токен");
//     req.user = user;
//     next();
//   });
// }

app.post("/api/auth/send", (req, res) => {
  const { email } = req.body;

  if (email === emailStatic) {
    const token = jwt.sign({ email: emailStatic }, tokenKeyAuth, {
      expiresIn: 600,
    });

    transporter.sendMail({
      from: emailStatic,
      to: "ronnieplayyt@gmail.com",
      subject: "Підтвердження авторизації",
      html: `<p>token: ${token}</p><button><a href='#'>Підтвердити</a></button>`,
    });

    return res
      .status(200)
      .json("Відправлено повідомлення на пошту для підтвердження");
  } else return res.status(404).json("Користувача не знайдено!");
});

app.post("/api/auth/confirm", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, tokenKeyAuth, (err, data) => {
    if (err) return res.status(401).json("Токен не є дійсним!");
    else if (data)
      return res
        .status(200)
        .json(jwt.sign({ email: emailStatic }, tokenKeyConf));
  });
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
