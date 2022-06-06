const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const simpleCrypt = require("simplecrypt");
const config = require("config");
const sc = simpleCrypt({ password: config.get("jwtKey") });
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).send("User already Exists");
  }
  const encryptedPassword = sc.encrypt(password);

  user = new User({
    name: name,
    email: email,
    password: encryptedPassword,
  });
  try {
    user = await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["_id", "name", "email", "isAdmin", "kycStatus"]));
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.put("/:email", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { kycStatus: true },
      { new: true }
    );
    return res.send(
      _.pick(user, ["_id", "name", "email", "kycStatus", "isAdmin"])
    );
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send("User Not Found");
    }
    id = mongoose.Types.ObjectId(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    return res.send(
      _.pick(user, ["_id", "name", "email", "kycStatus", "isAdmin"])
    );
  } catch (ex) {
    return res.status(500).send("Some Internal Error Occured");
  }
});

module.exports = router;
