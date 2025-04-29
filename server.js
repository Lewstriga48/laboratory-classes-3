const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config");
const logger = require("./utils/logger");
const productRoutes = require("./routing/products"); // ✅ GÜNCELLENDİ
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");
const { STATUS_CODE } = require("./constants/statusCode");

// 📦 Dependy the Importer
// Zaimportuj moduł 'getFileFromAbsolutePath', może Ci się przydać do ustawienia katalogu plików statycznych!

const app = express();

// 🔧 Configo the Setter
// Ustawiamy EJS jako silnik widoków
app.set("view engine", "ejs");

// Ustawiamy katalog widoków
app.set("views", path.join(__dirname, "views"));

// Ustawiamy folder publiczny dla plików statycznych (CSS, JS, img)
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, _response, next) => {
  const { url, method } = request;
  logger.getInfoLog(url, method);
  next();
});

app.use("/products", productRoutes); // ✅ GÜNCELLENDİ
app.use("/logout", logoutRoutes);
app.use("/kill", killRoutes);
app.use(homeRoutes);

// Obsługa błędu 404
app.use((request, response) => {
  const { url } = request;

  response
    .status(STATUS_CODE.NOT_FOUND)
    .sendFile(path.join(__dirname, "./views", "404.html"));

  logger.getErrorLog(url);
});

app.listen(PORT);
