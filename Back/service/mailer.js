const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: process.env.EMAIL_TO,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
