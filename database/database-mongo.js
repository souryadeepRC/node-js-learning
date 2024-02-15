const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
let _db;
const connectDb = (callback) => {
  mongoClient
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
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
