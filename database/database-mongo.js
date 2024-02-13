const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
let _db;
const connectDb = (callback) => {
  mongoClient
    .connect(
      "mongodb+srv://sourya:i6K6nKqbfhoJu7xD@daak-room-cluster.j5wyhiw.mongodb.net/daak-room-db?retryWrites=true&w=majority"
    )
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};
const getDb = () => {
  if (_db) return _db;
  return "No Database Found!";
};
module.exports = { connectDb, getDb };
