const express = require ("express"); 
const router = express.Router();

const productsController = require('../controllers/productsController.js');
const uploadFile = require('../middlewares/multerMiddleware');

router.get('/index',productsController.index);
router.get('/detalle/:id', productsController.detalle);

const maxFiles = 10;

// Create Products
router.get('/create',productsController.create);
//router.post('/new', uploadFile.single("imagesCar"), productsController.newProducts);
router.post('/new', uploadFile.array("imagesCar", maxFiles), productsController.newProducts);

router.get('/modificar',productsController.modificar); // Este sería del usuario
router.get('/menuModificar',productsController.menuModificar); // Este sería del admin


module.exports = router;