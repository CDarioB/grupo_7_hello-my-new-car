const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let indexController = {
    home: function(req, res, next) {
        res.render('home', { products: products});
    },
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