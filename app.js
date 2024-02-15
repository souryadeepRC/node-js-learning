const path = require("path");

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const lettersRoutes = require("./routes/letters");
const mongoDb = require("./database/database-mongo");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(lettersRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));
});

mongoDb.connectDb(() => {
  const port = process.env.port || 8000;
  app.listen(port);
});
