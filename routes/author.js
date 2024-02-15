const express = require("express");
const {
  signUpAuthor,
  updateAuthor,
  fetchLetters,
  fetchLetter,
} = require("../controller/author-controller");

const router = express.Router();

router.post("/signup", signUpAuthor);
router.put("/update-author", updateAuthor);
router.get("/letters", fetchLetters);
router.get("/letter/:letterId", fetchLetter);

module.exports = router;
