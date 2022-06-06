const express = require("express");
const cors = require("cors");
const auth = require("../routes/auth");
const users = require("../routes/users");
const faqs = require("../routes/faqs");
const stocks = require("../routes/stocks");
const fd = require("../routes/fixed-deposits");
const mf = require("../routes/mutual-funds");
const gold = require("../routes/gold");
const question = require("../routes/question");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/faq", faqs);
  app.use("/api/question", question);
  app.use("/api/stocks", stocks);
  app.use("/api/fd", fd);
  app.use("/api/mf", mf);
  app.use("/api/gold", gold);
};
