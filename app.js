const path = require("path");

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const lettersRoutes = require("./routes/letters");
const authorRoutes = require("./routes/author");
const { DATABASE_URL } = require("./constants/common-constants");
const cookieParser = require("cookie-parser");
const { getAuthor } = require("./controller/author-controller");

const API_BASE_URL = "/api/book-mart";
const app = express();
const mongoSessionStore = new MongodbStore({
  uri: DATABASE_URL,
  collection: "book-mart-sessions",
});
app.use(
  session({
    resave: false,
    secret: "123456",
    saveUninitialized: false,
    store: mongoSessionStore,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
/* app.use(cookieParser()); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${API_BASE_URL}/admin`, adminRoutes);
app.use(`${API_BASE_URL}/author`, authorRoutes);
app.use(`${API_BASE_URL}/account/user/me`, getAuthor);

app.use(lettersRoutes);
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
