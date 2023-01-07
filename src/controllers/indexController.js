const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let indexController = {
    home: function(req, res, next) {
        db.Product.findAll({
            include: ['province']
        }).then(products => {
            for(let i = 0; i < products.length; i++){
             products[i].img = products[i].img.split(",");
            }
            res.render('home', {products});
         });
        
    },
    login: function(req, res, next) {
        res.render('login')},
    recovery: function(req,res,next) {
        res.render('accountRecover');
    },

    cart: function(req,res,next) {
        db.Product.findAll({
            include: ['province']
        }).then(products => {
            for(let i = 0; i < products.length; i++){
             products[i].img = products[i].img.split(",");
            }
            res.render('carritoDeCompra', {products});
         });
    },

    favoritos: function(req,res,next) {
        res.send('Esta es la lista de favoritos');
    }
};
module.exports = indexController;