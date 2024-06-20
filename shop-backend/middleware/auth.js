const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  // Extract the token from the Authorization header
  try {
    const token = req.headers["authorization"].split(" ")[1];

    // If no token is provided, return an error
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      // Add the decoded user information to the request object
      req.user = decoded;
      console.log(req.user);
      next();
    });
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = auth;
