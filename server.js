const express = require('express');
const mongoose = require('mongoose');
const products = require('./routes/products');
const users = require('./routes/users');
const categories = require('./routes/categories');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/shopDB')
    .then(()=>{console.log("connected to the database")})
    .catch(()=>{console.log('database not connected');});

app.get('/',(req,res)=>{
    res.send("Hello world"); 
})
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/categories', categories);

app.listen(3000,()=>{console.log("server is starting")});