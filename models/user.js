require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  registrationID: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  imgURL: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    registrationID: Joi.string().min(2).max(50).required(),
    contactNumber: Joi.string().min(10).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    imgURL: Joi.string().min(5).max(1024).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

userSchema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
  return token;
};

exports.User = User;
exports.validate = validateUser;
