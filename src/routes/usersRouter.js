const express = require ("express"); 
const router = express.Router();
const {body} = require('express-validator');
const path = require('path');
const usersController = require('../controllers/usersController.js');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadFile = require('../middlewares/multerMiddlewareUsers');

let validationLogin = [
    body('nombreUsuario').notEmpty().withMessage('Debes completar el campo email').isEmail().withMessage('Debes ingresar un formato de email válido'),
    body('password').notEmpty().withMessage('Debes ingresar el campo contraseña')];

let validationRegister = [
    body('firstName').notEmpty().withMessage('Debes completar el campo de tus nombres').isLength({min: 2}).withMessage('El nombre tiene que tener al menos 2 caracteres'),
    body('lastName').notEmpty().withMessage('Debes completar el campo de tus apellidos'),
    body('tel').notEmpty().withMessage('Debes ingresar un telefono de contacto').matches(/^\+\d{2} \d{3} \d{3} \d{4}$/).withMessage('Debes ingresar un número de teléfono válido con la estructura +57 300 210 1850'),
    body('email').notEmpty().withMessage('Debes ingresar un email para la autenticación de tu usario').isEmail().withMessage('Debes ingresar un formato de email válido'),
    body('pass').notEmpty().withMessage('Debe rellenar el campo de contraseña').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('avatarUser').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
		let fileExtension  = '';

		if(file){
			fileExtension = path.extname(file.originalname);
		}
		if (!acceptedExtensions.includes(fileExtension) && fileExtension != 'noImage') {
			throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		}

		return true;
	})
]

//Middlewares

// Consulta de users
router.get('/', usersController.users);

//Crear Users
router.get('/create',guestMiddleware,usersController.create);
router.post('/new',uploadFile.single('avatarUser'),validationRegister,usersController.newUsers);

// Modificar Users
router.get('/modificacion/:id',usersController.modificar); // Este sería del admin
router.put('/edit/:id',uploadFile.single('avatarUserFile') ,usersController.update);

// Delete Users
router.post('/delete/:id', usersController.delete);

//Login User
router.get('/login',guestMiddleware,usersController.login);
router.post('/login',validationLogin,usersController.checkLogin)

//User logeado
router.get('/profile', authMiddleware ,usersController.logged)
router.get('/logout',authMiddleware ,usersController.logout)


module.exports = router;