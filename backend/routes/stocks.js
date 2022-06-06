const express = require("express");
const { Stock } = require("../models/stock");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).send(stock);
    }
    return res.send(stock);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    return res.send(stocks);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

module.exports = router;
