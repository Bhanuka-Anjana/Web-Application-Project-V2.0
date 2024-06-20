function admin(req, res, next) {
  //403 - Forbidden
  try {
    if (!req.user.isAdmin) {
      return res.status(403);
    }
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = admin;
