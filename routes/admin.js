const path = require("path");
const express = require("express");
// controllers
const { postLetter, getLetters } = require("../controller/adminController");

const router = express.Router();

router.get("/add-letter", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-letter.html"));
});
router.get("/getLetters", getLetters);
router.post("/add-letter", postLetter);
module.exports = router;
