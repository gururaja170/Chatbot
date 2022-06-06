const Joi = require("joi");
const express = require("express");
const router = express.Router();
const simpleCrypt = require("simplecrypt");
const config = require("config");
const sc = simpleCrypt({ password: config.get("jwtKey") });
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("User Not Found");
  }
  const dbPassword = sc.decrypt(user.password);
  if (dbPassword !== password) {
    return res.status(400).send("Invalid Email or Password");
  }
  const token = user.generateAuthToken();
  return res.send(token);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });
  const result = schema.validate(user);
  return result;
}

module.exports = router;
