const db = require("../db/models");
const Products = db.products;

exports.adminAddProducts = (req, res) => {

    const products = new Products({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        make: req.body.make
    });

    products.save((err, products) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Product added successfully!" });
        return;
    });
};
exports.adminGetProducts = (req, res) => {
    Products.find({
    }).exec((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(product);
        return;
    });
};