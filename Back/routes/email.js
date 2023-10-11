const express = require("express"),
  router = express.Router(),
  transporter = require("../service/mailer"),
  fs = require("fs"),
  util = require("util");

require("dotenv").config();

const emailStatic = process.env.EMAIL_TO;
const readFileAsync = util.promisify(fs.readFile);

router.post("/", async (req, res) => {
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
      to: "ppsyaivo-v@ukr.net",
      subject: `СЯЙВО-В - ${subject}`,
      html: updatedHtml,
    });

    res.status(201).json("Відправлено повідомлення!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Виникла помилка при відправці повідомлення!");
  }
});

module.exports = router;
