const express = require('express');
const { getProducts, addNewProduct } = require('../services/ProductService');


const productRouter = express.Router();

productRouter.get('/get-products', async (req, res, next) => {
   
    return getProducts(req, res, next)
});

productRouter.post('/add-product', async (req, res, next) => {
   
    return addNewProduct(req, res, next)
});

module.exports = productRouter;