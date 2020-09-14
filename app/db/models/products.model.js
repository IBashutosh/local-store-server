const mongoose = require("mongoose");

const Products = mongoose.model(
    "Products",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        make: Number
    })
);

module.exports = Products;