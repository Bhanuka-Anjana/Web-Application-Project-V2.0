const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      contactNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
      },
    }),
    required: true,
  },
  product: {
    type: new mongoose.Schema({
      productName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
      }
    }),
    required: true,
  },
  quantity: {
    type : Number,
    required : true,
    min : 1,
    max : 50
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  totalCost: {
    type: Number,
    min: 0,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    userId: Joi.objectId().required(),
    productId: Joi.objectId().required(),
    quantity: Joi.number().positive().greater(0).required()
  };

  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
