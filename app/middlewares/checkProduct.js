const db = require("../db/models");
const Products = db.products;

checkDuplicateProductName = (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.make) {
        return res.status(400).send({ message: "Please enter all fields!" });
    }
    // Username
    Products.findOne({
        name: req.body.name
    }).exec((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (product) {
            res.status(400).send({ message: "Failed! Product is already exist!" });
            return;
        }
        next();
    });
};

const verifyProducts = {
    checkDuplicateProductName
};

module.exports = verifyProducts;