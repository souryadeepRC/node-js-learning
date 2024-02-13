const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const lettersRoutes = require("./routes/letters");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/admin", adminRoutes);
app.use(lettersRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));
});

const port = process.env.port || 8000;
app.listen(port);
