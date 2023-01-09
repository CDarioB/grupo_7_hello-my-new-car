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
router.get('/edit',productsController.modify); // Vista admin listado de productos a modificar
router.get('/edit/:id', productsController.edit); // Formulario editar producto
router.put('/edit/:id', uploadFile.single('imgFile'), productsController.update); 

// Delete Products
router.post('/delete/:id', productsController.delete);

module.exports = router;