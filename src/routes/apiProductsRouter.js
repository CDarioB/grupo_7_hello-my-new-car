const express = require ("express"); 
const router = express.Router();
const apiProductsController = require('../controllers/apiProductsController.js');

//const uploadFile = require('../middlewares/multerMiddlewareProducts');


// Consulta de Products
//router.get('/', productsController.products);
//router.get('/detail/:id', productsController.detail);

//const maxFiles = 10;

// Menu para Crear/Modificar Products
//router.get('/index',productsController.index);

//Crear Products
//router.get('/create',productsController.create);
//router.post('/new', uploadFile.array("imagesCar", maxFiles), productValidations, productsController.newProducts);

// Modificar Products
//router.get('/edit',productsController.modify); // Vista admin listado de productos a modificar
//router.get('/edit/:id', productsController.edit); // Formulario editar producto
//router.put('/edit/:id', uploadFile.array('imagesCar',maxFiles), productValidations, productsController.update); 

// Delete Products
//router.post('/delete/:id', productsController.delete);
//router.post('/deleteImg/:idProduct/:idImage',productsController.deleteImg)

module.exports = router;