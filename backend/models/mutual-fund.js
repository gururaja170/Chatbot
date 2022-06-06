const mongoose = require("mongoose");
const Joi = require("joi");

const fundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Fund = mongoose.model("fund", fundSchema);

function validateFund(fund) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
  });
  const result = schema.validate(fund);
  return result;
}

module.exports.validate = validateFund;
module.exports.Fund = Fund;
