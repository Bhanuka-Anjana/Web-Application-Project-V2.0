require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user.email);
    res.status(200).send(req.user);
  } else {
    res.status(401).send(null);
  }
});

router.post("/logout", (req, res) => {
  // Destroy the session
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction failed:", err);
      return res.status(500).send("Logout failed");
    }
    // Clear the session cookie
    res.clearCookie("connect.sid"); 
    res.status(200).send("Logout successful");
  });
});

router.post("/local", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(401).send(info);
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).send(loginErr);
      }
      res.status(200).send(user);
    });
  })(req, res);
});

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  console.log(req.user);
  res.status(200).send("OK");
});
router.get(
  "/google",
  passport.authenticate("google"),
  (req, res) => {
    res.status(200).send("OK");
  },
  (req, res) => {
    console.log(req, res);
  }
);

module.exports = router;
