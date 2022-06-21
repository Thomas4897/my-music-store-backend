const express = require('express');
const { getProducts } = require('../services/ProductService');


const productRouter = express.Router();

productRouter.get('/get-products', async (req, res, next) => {
   
    return getProducts(req, res, next)
});


module.exports = productRouter;