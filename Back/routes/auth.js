const express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken");

require("dotenv").config();

const tokenKeyAuth = process.env.JWT_SECRET,
  emailStatic = process.env.EMAIL_TO;

router.post("/", (req, res) => {
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

module.exports = router;
