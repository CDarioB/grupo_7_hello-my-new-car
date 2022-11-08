const express = require ("express"); 
const router = express.Router();
let productosController = require('../controllers/productosController.js');


router.get('/detalle/:id', productosController.detalle);
router.get('/index',productosController.index);
router.get('/crear',productosController.crear);
router.get('/modificar',productosController.modificar); // Este sería del usuario
router.get('/menuModificar',productosController.menuModificar); // Este sería del admin

module.exports = router;