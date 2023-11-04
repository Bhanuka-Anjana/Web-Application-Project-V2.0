const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Product, validate } = require("../models/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", auth, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/:id", [auth, admin], async (req, res) => {
  const product = await Product.find({ _id: req.params.id });

  if (!product) {
    res.status(404).send({ message: "No product found for that ID..." });
  }

  res.send(product);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const product = new Product({
    productName: req.body.productName,
    numberInStock: req.body.numberInStock,
    unitPrice: req.body.unitPrice,
    categoryId: req.body.categoryId,
  });

  await product.save();

  res.send(product);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        productName: req.body.productName,
        numberInStock: req.body.numberInStock,
        unitPrice: req.body.unitPrice,
      },
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send({ message: "No product found for that ID..." });

  res.send(product);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) res.status(404).send("No product found for that ID...");

  res.send(product);
});

module.exports = router;
