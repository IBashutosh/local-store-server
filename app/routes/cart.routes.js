const { authJwt, verifyCart } = require("../middlewares");
const controller = require("../controllers/cart.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/cart/user",
        [authJwt.verifyToken, authJwt.isUser, verifyCart.validateAddCartRequest],
        controller.userAddToCart
    );

    app.get(
        "/api/cart/user",
        [authJwt.verifyToken, authJwt.isUser],
        controller.userGetCart
    );

};