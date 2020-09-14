module.exports = function (app) {
    require('./auth.routes')(app);
    require('./user.routes')(app);
    require('./products.routes')(app);
    require('./cart.routes')(app);
};