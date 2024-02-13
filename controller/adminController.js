const postLetter = (req, res) => {
  res.status(200).json({
    status: 200,
    isCreated: true,
    description: req.body?.title || "",
    timestamp: new Date(),
  });
};
const getLetters = (req, res) => {
    res.json({ title: "My Letter" });
  }
module.exports = {
    postLetter,
    getLetters
}