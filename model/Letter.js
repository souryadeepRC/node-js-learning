const uuid4 = require("uuid4");
const path = require("path");
const fs = require("fs");
const { getDb } = require("../database/database-mongo");

class Letter {
  constructor({ content, author, price }) {
    this._id = uuid4();
    this.content = content || undefined;
    this.author = author || undefined;
    this.status = 200;
    this.price = price;
    this.timestamp = new Date();
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
    getDb()
      .collection("daak-room-letters")
      .insertOne(this)
      .then((result) => {
        callback({ isCreated: result.acknowledged, ...this });
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
}
module.exports = Letter;
