const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { Product, validate } = require("../models/product");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Category } = require("../models/category");
const { Order } = require("../models/order");
const { uploadFile, removeFile } = require("../utils/s3Client");
const upload = require("../middleware/fileUpload");

// Get all products
router.get("/getall", async (req, res) => {
  try {
    const products = await Product.find().select("-__v");
    if (!products) {
      return res.status(404).send({ message: "No products found." });
    }
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Create a new product
router.post("/", [auth, admin, upload.single('file')], async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);

    //if there is an error return the error message
    if (error)
      return res.status(400).send({ message: error?.details[0]?.message });

    // Check if the category exists
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(400).send({ message: "Invalid category ID." });
    }

    // Create a new product
    const product = new Product({
      productName: req.body.productName,
      numberInStock: req.body.numberInStock,
      unitPrice: req.body.unitPrice,
      categoryId: req.body.categoryId,
    });

    // Upload the image to S3
    if (req.file) {
      const imagePath = await uploadFile(req.file);
      product.imageUrl = imagePath;
    }

    await product.save();

    const response = _.pick(product, [
      "_id",
      "productName",
      "numberInStock",
      "unitPrice",
      "categoryId",
      "imageUrl",
    ]);

    res
      .status(201)
      .send({ response, message: "Product created successfully." });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Update a product
router.put("/:id", [auth, admin, upload.single('file')], async (req, res) => {
  try {
    const { error } = validate(req.body);

    //if there is an error return the error message
    if (error)
      return res.status(400).send({ message: error?.details[0]?.message });

    // Check if the category exists
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(400).send({ message: "Invalid category ID." });
    }

    // Find the product
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      return res.status(404).send({ message: "No product found for that ID..." });
    }

    // check file is uploaded
    if (req.file) {
      // Remove the existing image from S3
      if (product.imagePath) {
        await removeFile(product.imagePath);
      }
      // Upload the new image to S3
      const imagePath = await uploadFile(req.file);
      product.imageUrl = imagePath;
    }

    // Update the product
    product.productName = req.body.productName;
    product.numberInStock = req.body.numberInStock;
    product.unitPrice = req.body.unitPrice;
    product.categoryId = req.body.categoryId;

    await product.save();

    if (!product)
      return res
        .status(404)
        .send({ message: "No product found for that ID..." });
    const response = _.pick(product, [
      "_id",
      "productName",
      "numberInStock",
      "unitPrice",
      "categoryId",
      "imageUrl",
    ]);

    res
      .status(200)
      .send({ response, message: "Product updated successfully." });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Delete a product
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    // Find the product
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).send({
        message: "No product found for that ID...",
      });
    }

    // Get the orders that contain the product
    const orders = await Order.find({ "products.productId": req.params.id });
    if (orders.length > 0) {
      return res.status(400).send({
        message: "Cannot delete product. It has orders associated with it.",
      });
    }

    // Remove the image from S3
    if (product.imagePath) {
      await removeFile(product.imagePath);
    }

    // Delete the product
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Product deleted successfully." });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
