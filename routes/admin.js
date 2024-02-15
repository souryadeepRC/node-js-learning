const path = require("path");
const express = require("express");
// controllers
const {
  sendLetter,
  fetchLetter,
  fetchLetters,
  updateLetter,
  deleteLetter,
  fetchLettersByAuthor,
} = require("../controller/letter-controller");

const router = express.Router();

router.post("/send-letter", sendLetter);
router.get("/letters", fetchLetters);
router.get("/letters-by-author", fetchLettersByAuthor);
router.put("/update-letter/:letterId", updateLetter);
router.get("/letter/:letterId", fetchLetter);
router.delete("/remove-letter", deleteLetter);
module.exports = router;
