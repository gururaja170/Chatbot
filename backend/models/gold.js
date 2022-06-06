const mongoose = require("mongoose");
const Joi = require("joi");

const goldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Gold = mongoose.model("gold", goldSchema);

function validateGold(gold) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
  });
  const result = schema.validate(gold);
  return result;
}

module.exports.validate = validateGold;
module.exports.Gold = Gold;
