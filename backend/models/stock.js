const mongoose = require("mongoose");
const Joi = require("joi");

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Stock = mongoose.model("stock", stockSchema);

function validateStock(stock) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
  });
  const result = schema.validate(stock);
  return result;
}

module.exports.validate = validateStock;
module.exports.Stock = Stock;
