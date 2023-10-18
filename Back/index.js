const express = require("express"),
  app = express(),
  cors = require("cors");

require("dotenv").config();

const productRoutes = require("./routes/products"),
  subcatalogRoutes = require("./routes/subcatalog"),
  emailRoutes = require("./routes/email"),
  authRoutes = require("./routes/auth"),
  mainRoutes = require("./routes/main"),
  catalogRoutes = require("./routes/catalog");

app.use(
  cors({
    origin: ["https://syaivo.rivne.ua", "http://syaivo.rivne.ua"],
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT,
  host = process.env.HOST;

app.use("/api/product", productRoutes);

app.use("/api/newproducts", mainRoutes);

app.use("/api/catalog", catalogRoutes);

app.use("/api/subcatalog", subcatalogRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/message", emailRoutes);

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
