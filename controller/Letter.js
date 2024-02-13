const Letter = require("../model/Letter");
const { sortLetters } = require("../utils/letter-utils");

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
    const sortedContent = sortLetters(filteredContent, req.query.sort);
    res.status(200).json(sortedContent);
  });
};
const fetchLettersByAuthor = (req, res) => {
  Letter.fetchAll((data) => {
    const authorWiseRecords = data.reduce((result, letter) => {
      const { price, author } = letter;
      if (!result[author]) {
        result[author] = {
          totalLetters: 1,
          totalPrice: price,
          letters: [letter],
        };
      } else {
        result[author].letters.push(letter);
        result[author].totalPrice += price;
        result[author].totalLetters += 1;
      }
      return result;
    }, {});
    res.status(200).json(authorWiseRecords);
  });
};
const fetchLetter = (req, res) => {
  Letter.fetchAll((data) => {
    const requestedLetter = data.filter(
      (letter) => letter.__id === req.params.letterId
    )?.[0];
    res.status(200).json(requestedLetter);
  });
};
module.exports = {
  sendLetter,
  fetchLetter,
  fetchLetters,
  fetchLettersByAuthor,
};
