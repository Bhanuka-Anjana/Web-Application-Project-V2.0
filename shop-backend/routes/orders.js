const auth = require("../middleware/auth");
const { Order, validate } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/",auth, async (req, res) => {
  const orders = await Order.find().select("-__v").sort("-dateOut");
  res.send(orders);
});

router.post("/",auth, async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid product.");

  if (product.numberInStock === 0)
    return res.status(400).send("Product not in stock.");

  let order = new Order({
    user: {
      _id: user._id,
      firstName: user.firstName,
      contactNumber: user.contactNumber,
    },
    product: {
      _id: product._id,
      productName: product.productName,
      unitPrice: product.unitPrice,
    },
    quantity: req.body.quantity,
    totalCost: product.unitPrice * req.body.quantity,
  });

  order = await order.save();
  product.numberInStock = product.numberInStock - order.quantity;
  product.save();

  res.send(order);
});

router.get("/:id",auth, async (req, res) => {
  const order = await Order.findById(req.params.id).select("-__v");

  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
});

module.exports = router;
