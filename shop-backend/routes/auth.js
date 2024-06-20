const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const generateToken = require("../utils/generateToken");
const { Order } = require("../models/order");
const { uploadFile, removeFile } = require("../utils/s3Client");
const upload = require("../middleware/fileUpload");

router.get("/me", auth, async (req, res) => {
  //get user from db
  try {
    const user = await User.findById(req.user._id).select("-__v -password");
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    //seperate email and password from req.body
    const { email, password } = req.body;

    //check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and Password are required" });
    }

    //check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
    //check if password is correct
    const response = await bcrypt.compareSync(password, user.password);
    if (!response) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }

    //generate token
    const token = generateToken(user);

    //send response with token
    return res.status(200).send({ token });
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

// user registration
router.post("/register", [upload.single("file")], async (req, res) => {
  try {
    //seperate user details from req.body
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    //check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    // upload image to s3
    const profilePicturePath = await uploadFile(req.file);

    //create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      profilePicturePath,
    });

    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //save user to db
    await user.save();

    //generate token
    const token = generateToken(user);

    //send response with token
    return res.status(200).send({ token });
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

// update user : /update/:id
router.put("/:id", [auth, upload.single("file")], async (req, res) => {
  try {
    //get user from db
    const user = await User.findById(req.params.id);

    //check if user exists
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // check request has image file
    if (req.file) {
      // remove old image from s3
      await removeFile(user.profilePicturePath);

      // upload new image to s3
      user.profilePicturePath = await uploadFile(req.file);
    }

    //update user details
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    //save user to db
    await user.save();

    //send response
    res
      .status(200)
      .send(
        _.pick(user, [
          "_id",
          "firstName",
          "lastName",
          "email",
          "isAdmin",
          "profilePicturePath",
        ])
      );
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

//delete user : /delete/:id
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    //get user from db
    const user = await User.findById(req.params.id);

    //check if user exists
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // check if user is admin
    if (user.isAdmin) {
      return res.status(400).send({ message: "Admin cannot be deleted" });
    }

    // check user have unfinished orders
    const orders = Order.find({
      userId: user._id,
      status: "Pending" || "Confirmed",
    });
    if (orders.length > 0) {
      return res.status(400).send({ message: "User have unfinished orders" });
    }

    // remove image from s3
    if (user.profilePicturePath) {
      await removeFile(user.profilePicturePath);
    }

    //delete user
    await user.deleteOne();

    //send response
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

// get all users : /getall
router.get("/getall", [auth, admin], async (req, res) => {
  //get all users from db
  try {
    // get without __v and password
    const users = await User.find().select("-__v -password");
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

// update admin state
router.put("/setadmin/:id", [auth, admin, ], async (req, res) => {
  try {
    //get user from db
    const user = await User.findById(req.params.id);

    //check if user exists
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    //update user details
    user.isAdmin = !user.isAdmin;

    //save user to db
    await user.save();

    //send response
    const response = await User.findById(req.params.id).select(
      "-__v -password"
    );
    res.status(200).send({ response, message: "User updated successfully" });
  } catch (err) {
    res.status(400).send({ message: err?.message });
  }
});

module.exports = router;
