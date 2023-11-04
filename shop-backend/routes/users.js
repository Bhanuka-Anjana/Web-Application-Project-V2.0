require("dotenv").config();
const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const passport = require("passport");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const users = await User.find().select("-__v").sort("name");
  res.send(users);
});

router.post("/", async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(401).send({ message: error.details[0].message });
  console.log("user details validated");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ message: "User already registered" });
  const tempPassword = req.body.password;
  user = new User(
    //pick values from lodash as object
    _.pick(req.body, ["firstName", "lastName", "email", "imgURL", "password"])
  );
  console.log(user);
  await user.setHashPassword();
  console.log("after hashed", user);
  try {
    user = await user.save();
    console.log("locally registerd user saved to database ---->");
  } catch (err) {
    console.log("something went wrong when saving the user");
    console.log(err);
  }

  // After successful registration, log the user in
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .send(info);
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(201).send({ message: "Registration and login successful" });
    });
  })(req, res, next);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imgURL: req.body.imgURL,
      password: hashedPassword,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(_.pick(user, ["_id", "firstName", "lastName", "email", "imgURL"]));
});

router.delete("/:id", async (req, res) => {
  console.log("sdedwdwdwdwd===============================>>>>>>>>.");
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(
    _.pick(user, ["_id", "firstName", "lastName", "email", "imgURL", "isAdmin"])
  );
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-__v");

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(
    _.pick(user, ["_id", "firstName", "lastName", "email", "imgURL", "isAdmin"])
  );
});

module.exports = router;
