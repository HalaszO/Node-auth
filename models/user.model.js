const config = require("config");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

UserSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("privatekey")
  );
  return token;
};

const User = mongoose.model("user", UserSchema);

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(5).max(255).required.email(),
    password: joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;