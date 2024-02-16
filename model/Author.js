const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: String,
  name: {
    firstName: String,
    lastName: String,
  },
  email: String,
  contact: {
    primary: {
      code: String,
      value: String,
    },
    secondary: {
      code: String,
      value: String,
    },
  },
});
module.exports = model("Author", AuthorSchema);
