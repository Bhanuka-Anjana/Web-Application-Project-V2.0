const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },

    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:5000
    },

    unitPrice:{
        type:Number,
        required:true,
        min:0,
        max:1000
    }
});

const Product = mongoose.model('Product', productSchema);

const validateProduct = (product) => {
    const schema = Joi.object({
        productName:Joi.string().min(3).required(),
        numberInStock:Joi.number().min(0).required(),
        unitPrice:Joi.number().min(0).required()
    })

    return schema.validate(product);
};

exports.Product = Product;
exports.validate = validateProduct;