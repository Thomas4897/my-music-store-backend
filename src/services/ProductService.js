const ProductModel = require("../Models/ProductModel");

const getProducts = async (req, res, next) => {
    //! All of the logic on how to get the product
    try {
        //! fetches data from the db
        const foundProducts = await ProductModel.find({});

        const formttedProducts = foundProducts.map(product => ({...product.toObject(), id: product._id}))

        res.send(formttedProducts);
    } catch (error) {
        console.log('error', error);
    }
};

module.exports = {
    getProducts,
}