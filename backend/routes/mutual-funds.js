const express = require("express");
const { Fund } = require("../models/mutual-fund");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fund = await Fund.findById(id);
    if (!fund) {
      return res.status(404).send(fund);
    }
    return res.send(fund);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const funds = await Fund.find();
    return res.send(funds);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

module.exports = router;
