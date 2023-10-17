require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const auth = require("./routes/auth");
const categories = require("./routes/categories");
const app = express();

if (!process.env.JWT_SECRET_KEY) {
  //terminate server because jwt is not defined
  process.exit(1);
}

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("connected to the database");
  })
  .catch(() => {
    console.log("database not connected");
  });

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/orders", orders);
app.use("/api/auth", auth);

app.listen(process.env.PORT, () => {
  console.log("server is starting");
});
