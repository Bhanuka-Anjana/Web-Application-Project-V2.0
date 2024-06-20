// Importing jsonwebtoken
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

module.exports = generateToken;
