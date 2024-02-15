const uuid4 = require("uuid4");
const { ObjectId } = require("mongodb");
const { getDb } = require("../database/database-mongo");

class Letter {
  constructor({ _id, content, author, price, created_ts }) {
    this._id = _id ? new ObjectId(_id) : null;
    this.content = content || null;
    this.author = author || null;
    this.price = price;
    this.created_ts = created_ts || new Date();
    this.updated_ts = _id ? new Date() : null;
  }
  send(callback) {
    if (!this.content) {
      callback({ title: "Wrong letter content", timestamp: this.timestamp });
      return;
    }
    if (!this.author) {
      callback({ title: "Invalid Author", timestamp: this.timestamp });
      return;
    }
    let dbOperation;
    if (this._id) {
      dbOperation = getDb()
        .collection("daak-room-letters")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = getDb().collection("daak-room-letters").insertOne(this);
    }
    dbOperation
      .then((result) => {
        callback(this);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll(callback) {
    getDb()
      .collection("daak-room-letters")
      .find()
      .toArray()
      .then((result) => {
        callback(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(letterId, callback) {
    getDb()
      .collection("daak-room-letters")
      .findOne({ _id: new ObjectId(letterId) })
      .then((response) => callback(response))
      .catch((err) => console.log(err));
  }
  static deleteById(letterId, callback) {
    return getDb()
      .collection("daak-room-letters")
      .deleteOne({ _id: new ObjectId(letterId) })
      .then((response) => response)
      .catch((err) => err);
  }
}
module.exports = Letter;
