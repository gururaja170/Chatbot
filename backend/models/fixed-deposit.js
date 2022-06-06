const mongoose = require("mongoose");
const Joi = require("joi");

const depositSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Deposit = mongoose.model("deposit", depositSchema);

function validateDeposit(deposit) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
  });
  const result = schema.validate(deposit);
  return result;
}

module.exports.validate = validateDeposit;
module.exports.Deposit = Deposit;
