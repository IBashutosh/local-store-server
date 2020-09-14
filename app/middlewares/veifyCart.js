const db = require("../db/models");
const Products = db.products;

validateAddCartRequest = (req, res, next) => {
    if (!req.body.products || !Array.isArray(req.body.products)) {
        return res.status(400).send({ message: "Invailid request!" });
    }
    Products.find(
        {
            name: { $in: req.body.products }
        },
        (err, products) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            req.products = products.map(product => product._id);
            if (req.products.length != req.body.products.length) {
                return res.status(400).send({ message: "Some Products are not available in list!" });
            }

            next();
        });
};
const verifyCart = {
    validateAddCartRequest
};

module.exports = verifyCart;