const Letter = require("../model/Letter");

const sendLetter = (req, res) => {
  const letter = new Letter(req.body);
  letter.send((createdLetterRes) => {
    res.status(200).json(createdLetterRes);
  });
};
const fetchLetters = (req, res) => {
  Letter.fetchAll((data) => {
    let filteredContent = data;
    const filters = req.body;
    for (const filterType in filters) {
      filteredContent = filteredContent.filter(
        (letter) => letter[filterType] === filters[filterType]
      );
    }
    res.status(200).json(filteredContent);
  });
};
const fetchLettersByAuthor = (req, res) => {
  Letter.fetchAll((data) => {
    const authorWiseRecords = data.reduce((result, letter) => {
      if (!result[letter.author]) {
        result[letter.author] = [letter];
      } else {
        result[letter.author].push(letter);
      }
      return result;
    }, {});
    res.status(200).json(authorWiseRecords);
  });
};
module.exports = { sendLetter, fetchLetters, fetchLettersByAuthor };
