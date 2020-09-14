
const config = require("../config/auth.config");
const db = require("../db/models");
const Cart = db.cart;
const Products = db.products;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.userGetCart = (req, res) => {
    Cart.findOne({ userId: req.userId }, (err, cart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!cart) {
            res.status(500).send({ message: "Cart is Empty" });
            return;
        }
        Products.find(
            {
                _id: { $in: cart.products }
            },
            (err, products) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send(products);
                return;
            });
    });
};
exports.userAddToCart = (req, res) => {
    const cart = {
        userId: req.userId,
        products: req.products
    };
    Cart.findOneAndUpdate({ userId: cart.userId }, { $set: cart },
        { upsert: true, new: true, runValidators: true, useFindAndModify: false },
        err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "Products are added successfully!" });
            return;
        });
};