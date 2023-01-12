var express = require('express');
var ROUTER = express.Router();
let indexController = require('../controllers/indexController.js');

ROUTER.get('/', indexController.home);

ROUTER.get('/login', indexController.login);

ROUTER.get('/recovery', indexController.recovery);

ROUTER.get('/cart', indexController.cart);

ROUTER.get('/favoritos', indexController.favoritos);

module.exports = ROUTER;
