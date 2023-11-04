function auth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "Plzz login" });
  }
  console.log("authenticated");
  next();
}

module.exports = auth;
