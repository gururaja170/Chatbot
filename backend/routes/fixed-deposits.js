const express = require("express");
const { Deposit } = require("../models/fixed-deposit");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deposit = await Deposit.findById(id);
    if (!deposit) {
      return res.status(404).send(deposit);
    }
    return res.send(deposit);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const deposits = await Deposit.find();
    return res.send(deposits);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

module.exports = router;
