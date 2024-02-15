const Letter = require("../model/Letter");
const { sortLetters } = require("../utils/letter-utils");
const { sendError } = require("./common-controller");

const sendLetter = (req, res) => {
  const letter = new Letter({
    ...req.body,
    created_ts: new Date(),
    updated_ts: null,
  });
  letter
    .save()
    .then((createdLetterRes) => {
      res.status(200).json(createdLetterRes);
    })
    .catch((err) => {
      console.log(err);
    });
};
const fetchLetters = (req, res) => {
  Letter.find()
    .populate("author")
    .then((data) => {
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
  Letter.find()
    .populate("author", "name email contact")
    .then((data) => {
      const authorWiseRecords = data.reduce((result, letter) => {
        const { price, author } = letter;
        const { _id, name, email, contact } = author;
        if (!result[_id]) {
          result[_id] = {
            details: { name, email, contact },
            totalLetters: 1,
            totalPrice: price,
            letters: [letter],
          };
        } else {
          result[_id].letters.push(letter);
          result[_id].totalPrice += price;
          result[_id].totalLetters += 1;
        }
        return result;
      }, {});
      res.status(200).json(authorWiseRecords);
    });
};
const fetchLetter = (req, res) => {
  Letter.findById(req.params.letterId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(sendError(res));
};
const updateLetter = (req, res) => {
  Letter.findById(req.params.letterId)
    .then((letter) => {
      const { content, author, price } = req.body;
      if (content) {
        letter.content = content;
      }
      if (author) {
        letter.author = author;
      }
      if (price) {
        letter.price = price;
      }
      letter.updated_ts = new Date();
      letter.save();
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(sendError(res));
};
const deleteLetter = (req, res) => {
  const letterId = req.body._id;
  Letter.findByIdAndDelete(letterId)
    .then((response) => {
      if (response) {
        res
          .status(202)
          .json({ _id: letterId, message: "Deleted Successfully!" });
      } else {
        res.status(202).json({ _id: letterId, message: "No Records Found!" });
      }
    })
    .catch(sendError(res, { _id: req.body._id }));
};
module.exports = {
  sendLetter,
  fetchLetter,
  fetchLetters,
  updateLetter,
  deleteLetter,
  fetchLettersByAuthor,
};
