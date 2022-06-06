const Joi = require("joi");
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  isLeafNode: {
    type: Boolean,
    default: false,
    required: true,
  },
  subCategory: {
    type: String,
    default: "",
  },
  isAnswered: {
    type: Boolean,
    required: true,
    default: false,
  },
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
  },
});

const Faq = mongoose.model("faq", faqSchema);

function validateFaq(faq) {
  const schema = Joi.object({
    category: Joi.string().required().label("Category"),
    isLeafNode: Joi.boolean().default(false).label("Is Leaf Node"),
    subCategory: Joi.string().empty("").label("Sub Category"),
    isAnswered: Joi.boolean().default(false).label("Is Answered"),
    question: Joi.string().required().label("Question"),
    answer: Joi.string().empty("").label("Answer"),
  });
  const result = schema.validate(faq);
  return result;
}

module.exports.Faq = Faq;
module.exports.validate = validateFaq;
