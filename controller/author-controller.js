const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Author = require("../model/Author");
const Letter = require("../model/Letter");
const { sendError } = require("./common-controller");

const signUpAuthor = (req, res) => {
  const { email, password, username } = req.body;
  Author.findOne({ email: email })
    .then((result) => {
      if (result) {
        return res.json({ msg: `Author with email ${email} Exist` });
      }
      return bcryptjs
        .hash(password, 12)
        .then((hashedPassword) => {
          const author = new Author({
            email,
            password: hashedPassword,
            username,
          });
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
const createToken = (id) => {
  return jwt.sign({ id }, "Souryadeep super secret key", {
    expiresIn: 2 * 60,
  });
};
const loginAuthor = (req, res) => {
  Author.findOne({ email: req.body.email })
    .then((author) => {
      if (!author) {
        throw new Error("We cannot find an account with that email address");
      }
      bcryptjs
        .compare(req.body.password, author.password)
        .then((isAuthenticated) => {
          if (isAuthenticated) {
            const { email, username } = author;
            const accessToken = createToken(author._id);
            /* res.cookie("jwt", accessToken, {
              withCrdentials: false,
              httpOnly: false,
              maxAge: 2 * 60 * 1000,
            }); */

            req.session.isLoggedIn = author.username; 
            return res.status(200).json({ email, username, accessToken });
          }
          throw new Error(`Dear ${author.email} please enter correct password`);
        })
        .catch(sendError(res));
    })
    .catch(sendError(res));
};
const logoutAuthor = (req,res) => { 
  req.session.destroy(err => { 
    res.json({err})
  })
}
const getAuthor = (req, res) => {
  // ?isLoggedInUser=true&userId=
  const bearerToken = req.headers.authorization;
  const token = bearerToken?.replace(/^Bearer\s+/, "");

  if (token) {
    jwt.verify(token, "Souryadeep super secret key", (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      }
      Author.findById(decoded.id)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(sendError(res));
    });
  } else {
    return res.json({
      success: false,
      message: "Token not provided",
    });
  }
};
const verifyLoginOtp = (req, res) => {
  const receivedOtp = req.body.otp;
  if (receivedOtp === "8574") {
    return res.status(200).json({ isLoginVerified: true });
  }
  res.status(404).json({
    error_description: "Invalid OTP",
  });
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
  req.session.isLoggedIn = true;
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
  loginAuthor,
  getAuthor,
  verifyLoginOtp,
  updateAuthor,
  fetchLetters,logoutAuthor,
  fetchLetter,
};
