const express = require ("express"); 
const router = express.Router();

const productsController = require('../controllers/productsController.js');
const uploadFile = require('../middlewares/multerMiddleware');

// Consulta de Products
router.get('/', productsController.products);
router.get('/detail/:id', productsController.detail);

const maxFiles = 10;

// Crear/Modificar Products
router.get('/index',productsController.index);

//Crear Products
router.get('/create',productsController.create);
router.post('/new', uploadFile.array("imagesCar", maxFiles), productsController.newProducts);

// Modificar Products
router.get('/modificar',productsController.modificar); // Este sería del usuario
router.get('/menuModificar',productsController.menuModificar); // Este sería del admin

// Delete Products
router.delete('/delete/:id', productsController.delete);

module.exports = router;