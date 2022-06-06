const express = require("express");
const { Gold } = require("../models/gold");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const gold = await Gold.findById(id);
    if (!gold) {
      return res.status(404).send(gold);
    }
    return res.send(gold);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const gold = await Gold.find();
    return res.send(gold);
  } catch (ex) {
    return res.status(500).send("Some Internal Error");
  }
});

module.exports = router;
