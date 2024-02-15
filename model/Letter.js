const { Schema, model } = require("mongoose");

const LetterSchema = new Schema({
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  price: {
    type: Number,
  },
  created_ts: {
    type: Date,
  },
  updated_ts: {
    type: Date,
  },
});

module.exports = model("Letter", LetterSchema);
