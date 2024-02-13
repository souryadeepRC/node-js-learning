const uuid4 = require("uuid4");
const path = require("path");
const fs = require("fs");

class Letter {
  constructor({ content, author }) {
    this.__id = uuid4();
    this.content = content || undefined;
    this.author = author || undefined;
    this.status = 200;
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
    const filePath = path.resolve(
      path.dirname(process.mainModule.filename),
      "data/letter.json"
    );
    fs.readFile(filePath, (err, fileContent) => {
      let letters = [];
      if (!err) {
        letters = JSON.parse(fileContent);
      }
      const modifiedLetters = [this, ...letters];
      fs.writeFile(filePath, JSON.stringify(modifiedLetters), (err) => {});
      callback({ isCreated: true, ...this });
    });
  }
  static fetchAll(callback) {
    const filePath = path.resolve(
      path.dirname(process.mainModule.filename),
      "data/letter.json"
    );
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        callback([]);
      }
      callback(JSON.parse(fileContent));
    });
  }
}
module.exports = Letter;
