const { Category, validate } = require("../models/category");
const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const _ = require("lodash");
const { Product } = require("../models/product");

// Get all categories
router.get("/getall", async (req, res) => {
  try {
    const categories = await Category.find().select("-__v");
    if (!categories) {
      return res.status(404).send({ message: "No categories found." });
    }
    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Create a new category
router.post("/", [auth, admin], async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error?.details[0]?.message });

    // Create a new category
    let category = new Category({ name: req.body.name });
    category = await category.save();
    const response = _.pick(category, ["_id", "name"]);
    res
      .status(201)
      .send({ response, message: "Category created successfully." });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Update a category
router.put("/:id", [auth, admin], async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error?.details[0]?.message });

    // Update the category
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!category)
      return res
        .status(404)
        .send({ message: "The category with the given ID was not found." });
    const response = _.pick(category, ["_id", "name"]);
    res
      .status(200)
      .send({ response, message: "Category updated successfully." });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Delete a category
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    // Delete the category
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .send({ message: "The category with the given ID was not found." });
    }

    // check if the category has products
    const products = await Product.find({ categoryId: req.params.id });
    if (products.length > 0) {
      return res.status(400).send({
        message: "Cannot delete category. It has products associated with it.",
      });
    }

    await Category.findByIdAndRemove(req.params.id);

    res.status(200).send({ message: "Category deleted successfully." });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
