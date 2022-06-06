const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const { Faq, validate } = require("../models/faq");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  let faq = await Faq.findOne({ question: req.body.question });
  if (faq) {
    return res.status(400).send("FAQ Already Exists");
  }
  faq = new Faq(req.body);
  try {
    faq = await faq.save();
    return res.send(faq);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.get("/:category/:subCategory", async (req, res) => {
  try {
    let faqs = [];
    const category = req.params.category;
    const subCategory = req.params.subCategory;
    if (category == subCategory) {
      faqs = await Faq.find({
        category: category,
        subCategory: "",
        isAnswered: true,
      }).limit(5);
    } else {
      faqs = await Faq.find({
        category: category,
        subCategory: subCategory,
        isAnswered: true,
      }).limit(5);
    }
    return res.send(faqs);
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send("Faq Not Found");
    }
    id = mongoose.Types.ObjectId(id);
    const faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).send("Faq Not Found");
    }
    return res.send(faq);
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send("Faq Not Found");
    }
    id = mongoose.Types.ObjectId(id);
    const { isLeafNode, isAnswered, answer, category, subCategory } = req.body;
    const faq = await Faq.findByIdAndUpdate(
      id,
      { isLeafNode, isAnswered, answer, category, subCategory },
      { new: true }
    );
    if (!faq) {
      return res.status(404).send("Faq Not Found");
    }
    return res.send(faq);
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

module.exports = router;
