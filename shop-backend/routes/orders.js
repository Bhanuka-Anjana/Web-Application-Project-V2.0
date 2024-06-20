const { Order, validate } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const _ = require("lodash");
const admin = require("../middleware/admin");

// Get all orders
router.get("/", [auth], async (req, res) => {
  try {
    //get the user
    const user = await User.findById(req.user._id);

    //if user is null return an error
    if (!user) return res.status(404).send({ message: "User not found." });

    //if user is not admin return specific orders
    if (!user.isAdmin) {
      //check if query parameter is passed
      if (req.query.id) {
        //find order by id
        const order = await Order.findById(req.query.id).select("-__v");
        //if no order is found return an error
        if (!order)
          return res.status(404).send({ message: "Order not found." });
        return res.status(200).send(order);
      }

      const orders = await Order.find({ userId: user._id })
        .select("-__v")
        .sort("-CreateDate -status");
      return res.status(200).send(orders);
    } else {
      //if user is admin return all orders
      const orders = await Order.find().select("-__v").sort("-createDate");
      return res.status(200).send(orders);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Create a new order
router.post("/", [auth], async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0]?.message });
    }

    // Check if the user exists
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send({ message: "Invalid user." });

    // Check if the products exist and have enough stock
    for (let i = 0; i < req.body.products.length; i++) {
      let product = await Product.findById(req.body.products[i].productId);
      if (!product)
        return res.status(400).send({ message: "Invalid product." });
    }

    // Create the order
    let order = new Order({
      userId: user._id,
      products: req.body.products,
      totalCost: req.body.totalCost,
      pickupDetails: req.body.pickupDetails,
    });

    // Save the order
    order = await order.save();

    const response = _.pick(order, [
      "_id",
      "userId",
      "products",
      "totalCost",
      "status",
      "pickupDetails",
      "createDate"
    ]);

    res.status(201).send({ response, message: "Order created successfully." });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.put("/:id", [auth], async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0]?.message });

    // Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ message: "Order not found." });

    // Check if the user exists
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send({ message: "Invalid user." });

    // Check if the products exist and have enough stock
    for (let i = 0; i < req.body.products.length; i++) {
      let product = await Product.findById(req.body.products[i].productId);
      if (!product)
        return res.status(400).send({ message: "Invalid product." });

      if (product.numberInStock < req.body.products[i].quantity)
        return res.status(400).send({ message: "Not enough stock." });
    }

    // Update the order
    order.userId = user._id;
    order.products = req.body.products;
    order.totalCost = req.body.totalCost;

    // Save the order
    await order.save();

    const responce = _.pick(order, [
      "_id",
      "userId",
      "products",
      "totalCost",
      "status",
    ]);

    res.status(200).send({ responce, message: "Order updated successfully." });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Delete an order if status is pending and user is equal to user in the order
router.delete("/:id", [auth], async (req, res) => {
  try {
    // Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ message: "Order not found." });

    // Check if the user is the owner of the order
    if (order.userId != req.user._id)
      return res.status(403).send({ message: "Access denied." });

    // Check if the order is pending
    if (order.status !== "Pending")
      return res
        .status(400)
        .send({ message: " Order cannot be delete. It already shipped" });

    // Delete the order
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Order deleted successfully." });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Update the status of an order by admin (accept or reject)
router.put("/status/:id", [auth], async (req, res) => {
  try {
    // Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ message: "Order not found." });

    // Update the status of the order
    order.status = req.body.status;

    // Save the order
    await order.save();

    // reduce the quantity of each product in order if Status is confirmed
    if (order.status === "Shipped") {
      for (let i = 0; i < order.products.length; i++) {
        let product = await Product.findById(order.products[i].productId);
        product.numberInStock -= order.products[i].quantity;
        await product.save();
      }
    }

    const response = _.pick(order, [
      "_id",
      "userId",
      "products",
      "totalCost",
      "status",
      "pickupDetails",
    ]);

    res.status(200).send({ response, message: "Order status updated." });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
