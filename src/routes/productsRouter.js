const express = require ("express"); 
const router = express.Router();
const { check } = require('express-validator');

const productsController = require('../controllers/productsController.js');
const uploadFile = require('../middlewares/multerMiddleware');

const productCreationValidations = [
	check('refCar')
        .notEmpty().withMessage('Tienes que escribir una referencia.')
        .isLength({ min: 20}).withMessage('La referencia debe tener por lo menos 20 caracteres'),
    check('brandCar')
        .notEmpty().withMessage('Tienes que escribir la marca del vehículo.')
        .isLength({ min: 4}).withMessage('La referencia debe tener por lo menos 5 caracteres.'),
    check('provinceCar')
	    .notEmpty().withMessage('Seleciona provincia en que se encuentra ubicado el vehículo.'),
	check('categoryTypeCar')
        .notEmpty().withMessage('Seleciona un categoría del vehículo.'),
	check('modelYearCar')
        .notEmpty().withMessage('Seleciona el modelo del vehículo.'),
    check('mileageCar')
        .notEmpty().withMessage('Introdusca los km recorrido por el vehículo.')
        .isNumeric().withMessage('Solo numeros.')
        .isInt().withMessage('Solo numeros Enteros.'),
    check('priceCar')
        .notEmpty().withMessage('Introdusca el pecio de venta sin descuento')
        .isNumeric().withMessage('Solo numeros.'),
    check('discountCar')
        .notEmpty().withMessage('Introdusca el % de descuento, en caso de no tener descuento introdusca 0 (cero).')
        .isNumeric().withMessage('Solo numeros.'),    
	check('imagesCar')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            
            if (!file) {
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }

            return true; 
        })
]

// Consulta de Products
router.get('/', productsController.products);
router.get('/detail/:id', productsController.detail);

const maxFiles = 10;

// Menu para Crear/Modificar Products
router.get('/index',productsController.index);

//Crear Products
router.get('/create',productsController.create);
router.post('/new', uploadFile.array("imagesCar", maxFiles), productCreationValidations, productsController.newProducts);

// Modificar Products
router.get('/edit',productsController.modify); // Vista admin listado de productos a modificar
router.get('/edit/:id', productsController.edit); // Formulario editar producto
router.put('/edit/:id', uploadFile.array('imagesCar',maxFiles), productCreationValidations, productsController.update); 

// Delete Products
router.post('/delete/:id', productsController.delete);
router.post('/deleteImg/:idProduct/:idImage',productsController.deleteImg)

module.exports = router;