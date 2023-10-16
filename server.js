const express = require('express');
const mongoose = require('mongoose');
const products = require('./routes/products');
const users = require('./routes/users');
const orders = require('./routes/orders');
const auth = require('./routes/auth');
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
app.use('/api/orders', orders);
app.use('/api/auth', auth);

app.listen(3000,()=>{console.log("server is starting")});