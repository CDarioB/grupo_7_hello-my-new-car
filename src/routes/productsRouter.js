const express = require ("express"); 
const router = express.Router();
const { check } = require('express-validator');

const productsController = require('../controllers/productsController.js');
const uploadFile = require('../middlewares/multerMiddlewareProducts');

const productValidations = [
	check('refCar')
        .notEmpty().withMessage('Tienes que escribir una referencia.')
        .isLength({ min: 20}).withMessage('La referencia debe tener por lo menos 20 caracteres'),
    check('brandCar')
        .notEmpty().withMessage('Tienes que escribir la marca del vehículo.')
        .isLength({ min: 3}).withMessage('La marca debe tener por lo menos 3 caracteres.'),
    check('provinceCar')
	    .notEmpty().withMessage('Selecciona la provincia en que se encuentra ubicado el vehículo.'),
	check('categoryTypeCar')
        .notEmpty().withMessage('Selecciona una categoría para el vehículo.'),
	check('modelYearCar')
        .notEmpty().withMessage('Selecciona el modelo del vehículo.'),
    check('mileageCar')
        .notEmpty().withMessage('Introduce los kms recorridos por el vehículo.')
        .isNumeric().withMessage('Solo números.')
        .isInt().withMessage('Solo números Enteros.'),
    check('priceCar')
        .notEmpty().withMessage('Introduce el precio de venta sin descuento')
        .isNumeric().withMessage('Solo números.'),
    check('discountCar')
        .notEmpty().withMessage('Introduce el % de descuento, en caso de no tener descuento Introduce 0 (cero).')
        .isNumeric().withMessage('Solo números.'),    
	check('imagesCar')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            
            if (!file) {
                throw new Error('Tienes que subir una imagen.');
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
router.post('/new', uploadFile.array("imagesCar", maxFiles), productValidations, productsController.newProducts);

// Modificar Products
router.get('/edit',productsController.modify); // Vista admin listado de productos a modificar
router.get('/edit/:id', productsController.edit); // Formulario editar producto
router.put('/edit/:id', uploadFile.array('imagesCar',maxFiles), productValidations, productsController.update); 

// Delete Products
router.post('/delete/:id', productsController.delete);
router.post('/deleteImg/:idProduct/:idImage',productsController.deleteImg)

module.exports = router;