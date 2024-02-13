const path = require("path");
const express = require("express");
// controllers
const { sendLetter, fetchLetters, fetchLettersByAuthor } = require("../controller/Letter");

const router = express.Router();

router.get("/add-letter", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-letter.html"));
});
router.get("/getLetters", fetchLetters);
router.get("/getLettersByAuthor", fetchLettersByAuthor);
router.post("/send-letter", sendLetter);
module.exports = router;
