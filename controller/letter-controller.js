const Letter = require("../model/Letter");
const { sortLetters } = require("../utils/letter-utils");
const { sendError } = require("./common-controller");

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
  try {
    Letter.findById(req.params.letterId, (data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    sendError(res, err);
  }
};
const updateLetter = (req, res) => {
  const letter = new Letter(req.body);
  letter.send((result) => {
    res.status(201).json(result);
  });
};
const deleteLetter = (req, res) => {
  try {
    const letterId = req.body._id;
    Letter.deleteById(letterId)
      .then((result) => {
        if (result?.deletedCount) {
          res
            .status(202)
            .json({ _id: letterId, message: "Deleted Successfully!" });
        } else {
          res.status(202).json({ _id: letterId, message: "No Records Found!" });
        }
      })
      .catch((err) => {
        sendError(res, err, { _id: req.body._id });
      });
  } catch (err) {
    sendError(res, err, { _id: req.body._id });
  }
};
module.exports = {
  sendLetter,
  fetchLetter,
  fetchLetters,
  updateLetter,
  deleteLetter,
  fetchLettersByAuthor,
};
