const express = require ("express"); 
const router = express.Router();

const productsController = require('../controllers/productsController.js');
const uploadFile = require('../middlewares/multerMiddleware');

router.get('/index',productsController.index);
router.get('/detail/:id', productsController.detalle);

const maxFiles = 10;

// Create Products
router.get('/create',productsController.create);
router.post('/new', uploadFile.array("imagesCar", maxFiles), productsController.newProducts);

// Modificar productos
router.get('/modificar',productsController.modificar); // Este sería del usuario
router.get('/menuModificar',productsController.menuModificar); // Este sería del admin


module.exports = router;