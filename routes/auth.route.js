const { User, validate } = require("../models/user.model");
const { auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { err } = validate(req.body);
  if (err) res.status(400).send(err.details[0].message);

  let user = User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This email is already registered!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const hashSalt = floor(Math.random() * 15 + 5);
  user.password = await bcrypt.hash(user.password, hashSalt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("Authentication", token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

exports.router = router;