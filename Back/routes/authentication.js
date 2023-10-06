const jwt = require("jsonwebtoken");

require("dotenv").config();

const tokenKeyAuth = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send("Доступ заборонено.");
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, tokenKeyAuth, (err, auth) => {
    if (err) return res.status(403).send("Недійсний токен");

    if (auth.exp < Date.now() / 1000) {
      return res.status(403).json({ error: "Токен закінчив дію." });
    }

    req.auth = auth;
    next();
  });
}

module.exports = authenticateToken;
