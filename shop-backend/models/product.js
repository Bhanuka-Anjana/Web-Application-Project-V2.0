const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 5000,
  },

  unitPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
  categoryId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    productName: Joi.string().min(3).required(),
    numberInStock: Joi.number().min(0).required(),
    unitPrice: Joi.number().min(0).required(),
    categoryId: Joi.objectId().required(),
    imageUrl: Joi.string().default(null),
  });

  return schema.validate(product);
};

exports.Product = Product;
exports.validate = validateProduct;
