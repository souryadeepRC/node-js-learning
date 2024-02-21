const express = require("express");
const {
  signUpAuthor,
  loginAuthor,
  verifyLoginOtp,
  updateAuthor,
  fetchLetters,
  fetchLetter,
  logoutAuthor,
} = require("../controller/author-controller");

const router = express.Router();

router.post("/signup", signUpAuthor);
router.post("/login", loginAuthor);
router.post("/verify-login-otp", verifyLoginOtp);
router.post("/logout", logoutAuthor);
router.put("/update-author", updateAuthor);
router.get("/letters", fetchLetters);
router.get("/letter/:letterId", fetchLetter);

module.exports = router;
