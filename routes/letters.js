const path = require("path");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../","views","letters.html"));
});

module.exports = router;
