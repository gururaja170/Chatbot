const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("dbURL");
  mongoose
    .connect(db)
    .then(() => console.log("Successfully Connected to MongoDB"))
    .catch(() => console.log("Connection to MongoDB Failed"));
};
