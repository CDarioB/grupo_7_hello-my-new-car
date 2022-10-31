const EXPRESS = require ("express"); 
let productosController = require('../controllers/productosController.js');

var ROUTER = EXPRESS.Router();
ROUTER.get('/detalle/:id', productosController.detalle);
ROUTER.get('/index',productosController.index);
ROUTER.get('/crear',productosController.crear);
ROUTER.get('/modificar',productosController.modificar);
ROUTER.get('/menuModificar',productosController.menuModificar);
module.exports = ROUTER;