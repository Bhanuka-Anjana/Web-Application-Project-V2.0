require("dotenv").config();
require("./startup/passport/googleStrategy");
require("./startup/passport/localStrategy");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();

const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const auth = require("./routes/auth");
const categories = require("./routes/categories");

//cors config
app.use(
  cors({
    // allow to server to accept request from different origin
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allow session cookie from browser to pass through
    credentials: true,
    // this is needed for sending JSON
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

if (!process.env.JWT_SECRET_KEY) {
  //terminate server because jwt is not defined
  process.exit(1);
}

// This is the basic express session({..}) initialization.
app.use(
  session({
    secret: "my-small-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// init passport on every route call.
app.use(passport.initialize());

// allow passport to use "express-session".
app.use(passport.session());

//set serialized user and de-serialized user 
require("./startup/passport/index");

//routes
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/orders", orders);
app.use("/api/auth", auth);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("connected to the database");
  })
  .catch(() => {
    console.log("database not connected");
  });

app.listen(process.env.PORT, () => {
  console.log("server is starting");
});
