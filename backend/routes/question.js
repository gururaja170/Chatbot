const express = require("express");
const router = express.Router();
const { Faq } = require("../models/faq");
const { stringSimilarity } = require("string-similarity-js");

router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find({ isAnswered: false });
    return res.send(faqs);
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

router.get("/:msg", async (req, res) => {
  try {
    const message = req.params.msg.toLowerCase();
    const exactFaq = await Faq.findOne({
      question: new RegExp(`^${message}[?]$`, "i"),
      isAnswered: true,
    });
    if (exactFaq) {
      return res.send(exactFaq);
    }
    const faqs = await Faq.find({ isAnswered: true });
    const similarFaqs = [];
    faqs.filter((faq) => {
      const question = faq.question.toLowerCase();
      const degree = stringSimilarity(question, message);
      if (degree > 0.5) {
        similarFaqs.push(faq);
      } else if (question.includes(message) || message.includes(question)) {
        similarFaqs.push(faq);
      }
    });
    if (similarFaqs.length >= 1) {
      return res.send(similarFaqs.slice(0, 3));
    }
    return res.status(404).send("Faq Not Found");
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

module.exports = router;
