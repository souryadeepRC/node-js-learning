const path = require("path");
const express = require("express");

const router = express.Router();

router.get("/add-letter", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-letter.html"));
});
router.get("/getLetters", (req, res) => {
  res.json({ title: "My Letter" });
});
router.post("/add-letter", (req, res) => {
  const obj = Object.assign({}, req.body);
  console.log(req.body.letter);
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
