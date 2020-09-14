const { authJwt, checkProduct } = require("../middlewares");
const controller = require("../controllers/products.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/products/admin",
        [authJwt.verifyToken, authJwt.isAdmin, checkProduct.checkDuplicateProductName],
        controller.adminAddProducts
    );

    app.get(
        "/api/products/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminGetProducts
    );

};