const mongoose = require("mongoose");

const Cart = mongoose.model(
    "Cart",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            }
        ]
    })
);

module.exports = Cart;