const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();
const { Product, validate } = require('../models/product');

router.get('/', async (req, res) =>{
    const products = await Product
        .find()
        .sort('name')

    res.send(products);
})

router.get('/:id', async (req, res) => {

    const product = await Product
        .find({_id:req.params.id});

    if (!product) res.status(404).send("No product found for that ID...");

    res.send(product);

})

router.post('/',async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product({
        productName : req.body.productName,
        numberInStock : req.body.numberInStock,
        unitPrice : req.body.unitPrice
    });

    await product.save();

    res.send(product);
})

router.put('/:id', async (req, res)=>{

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let product = await Product.findByIdAndUpdate(req.params.id,{
        $set:{
            productName:req.body.productName,
            numberInStock:req.body.numberInStock,
            unitPrice:req.body.unitPrice
        }
    }, {new:true})

    if (!product) return res.status(404).send("No product found for that ID...");

    res.send(product);

})

router.delete('/:id', async (req, res)=>{
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) res.status(404).send("No product found for that ID...");

    res.send(product);
})

module.exports = router;