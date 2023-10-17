const express = require("express"),
  router = express.Router(),
  authenticateToken = require("./authentication"),
  jwt = require("jsonwebtoken"),
  fs = require("fs"),
  bcrypt = require("bcrypt");

require("dotenv").config();

const tokenKeyAuth = process.env.JWT_SECRET,
  emailStatic = process.env.EMAIL_TO;

function readUsers() {
  const usersData = fs.readFileSync("admin.json");
  return JSON.parse(usersData);
}

function writeUsers(users) {
  fs.writeFileSync("admin.json", JSON.stringify(users));
}

router.post("/", (req, res) => {
  if (!req.body || !req.body.login || !req.body.password)
    res.status(404).json("Потрібно ввести дані!");

  const { login, password } = req.body;

  try {
    const users = readUsers();

    if (
      login == process.env.ADMIN_LOGIN &&
      bcrypt.compareSync(password, users.password)
    )
      return res
        .status(200)
        .json(jwt.sign({ email: emailStatic, login: login }, tokenKeyAuth));
    else return res.status(404).json("Ви ввели неправильні дані!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка аторизації!");
  }
});

router.post("/change-password", authenticateToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const users = readUsers();

    if (!bcrypt.compareSync(oldPassword, users.password)) {
      res.status(404).json("Пароль вказано не вірно!");
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    users.password = hashedPassword;
    writeUsers(users);

    res.status(201).json("Пароль змінено!");
  } catch (error) {
    res.status(500).json("Помилка в змінені пароля!");
  }
});

module.exports = router;
