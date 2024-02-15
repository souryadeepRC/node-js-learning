const bcryptjs = require("bcryptjs");

const Author = require("../model/Author");
const Letter = require("../model/Letter");
const { sendError } = require("./common-controller");

const signUpAuthor = (req, res) => {
  const { email, password } = req.body;
  Author.findOne({ email: email })
    .then((result) => {
      if (result) {
        return res.json({ msg: `Author with email ${email} Exist` });
      }
      return bcryptjs
        .hash(password, 12)
        .then((hashedPassword) => {
          const author = new Author({ email, password: hashedPassword });
          author
            .save()
            .then((data) => {
              res.status(201).json(data);
            })
            .catch(sendError(res));
        })
        .catch(sendError(res));
    })
    .catch(sendError(res));
};
const updateAuthor = (req, res) => {
  const author = new Author(req.body);

  Author.findById(req.body._id)
    .then((author) => {
      if (author) {
        const { name, contact } = req.body;
        author.name = name;
        author.contact = contact;
        author
          .save()
          .then((response) => res.status(201).json(response))
          .catch(sendError(res));
      }
    })
    .catch(sendError(res));
};
const fetchLetters = (req, res) => {
  Letter.find({ author: req.body.author_id })
    .select("content price")
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(sendError(res));
};
const fetchLetter = (req, res) => {
  Letter.find({ author: req.body.author_id, _id: req.params.letterId })
    .select("content price")
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(sendError(res));
};
module.exports = {
  signUpAuthor,
  updateAuthor,
  fetchLetters,
  fetchLetter,
};
