const path = require("path");

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const lettersRoutes = require("./routes/letters");
const authorRoutes = require("./routes/author");
const { DATABASE_URL } = require("./constants/common-constants");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(lettersRoutes);
app.use('/author',authorRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));
});

mongoose
  .connect(DATABASE_URL)
  .then((res) => {
    const port = process.env.port || 8000;
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
