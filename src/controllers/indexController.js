let indexController = {
    home: function(req, res, next) {
        res.render('home');},

    login: function(req, res, next) {
        res.render('login')},
    
    register: function(req,res,next) {
        res.render('register');
    },

    recovery: function(req,res,next) {
        res.render('accountRecover');
    },

    cart: function(req,res,next) {
        res.render('carritoDeCompra');
    },

    favoritos: function(req,res,next) {
        res.send('Esta es la lista de favoritos');
    }
};
module.exports = indexController;