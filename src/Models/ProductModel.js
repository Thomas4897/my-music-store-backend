//! This is the file where you are going to have the logic to fetch data insert data in the database
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
    // id: { type: String, require: true, default: () => uuidv4() },
    title: { type: String, require: true },
    description: { type: String, require: true },
    brand:{ type: String, require: true },
    price:{ type: Number, require: true },
    image: { type: String, require: true },
})

//! The Model is the onject that is going to have the Methods/functinos to read and change the DB
const ProductModel = mongoose.model('product', productSchema)

module.exports = ProductModel


