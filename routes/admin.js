const path = require("path");
const express = require("express");
// controllers
const {
  sendLetter,
  fetchLetter,
  fetchLetters,
  fetchLettersByAuthor,
} = require("../controller/Letter");

const router = express.Router();

router.get("/add-letter", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-letter.html"));
});
router.get("/letters", fetchLetters);
router.get("/lettersByAuthor", fetchLettersByAuthor);
router.post("/send-letter", sendLetter);
router.get("/letter/:letterId", fetchLetter);
module.exports = router;
