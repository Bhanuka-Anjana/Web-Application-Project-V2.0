const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

const products = require("./routes/products");
const orders = require("./routes/orders");
const auth = require("./routes/auth");
const categories = require("./routes/categories");

//cors config
app.use(
  cors({
    // allow to server to accept request from different origin
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allow session cookie from browser to pass through
    credentials: true,
    // this is needed for sending JSON
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(express.json());

if (!process.env.JWT_SECRET_KEY) {
  //terminate server because jwt is not defined
  process.exit(1);
}

//routes
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/orders", orders);
app.use("/api/auth", auth);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((e) => {
    console.log("database not connected");
    console.log(e);
  });

app.listen(process.env.PORT, () => {
  console.log("server is starting on " + process.env.PORT);
});
