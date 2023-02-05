const express = require ("express"); 
const router = express.Router();
const {body} = require('express-validator');
const usersController = require('../controllers/usersController.js');
const uploadFile = require('../middlewares/multerMiddlewareUsers');
let validationLogin = [
    body('nombreUsuario').notEmpty().withMessage('Debes completar el campo email').isEmail().withMessage('Debes ingresar un formato de email válido'),
    body('password').notEmpty().withMessage('Debes ingresar la contraseña').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')];

//Middlewares

// Consulta de users
router.get('/', usersController.users);

//Crear Users
router.get('/create',usersController.create);
router.post('/new', usersController.newUsers);

// Modificar Users
router.get('/modificacion/:id',usersController.modificar); // Este sería del admin
router.put('/edit/:id',uploadFile.single('avatarUserFile') ,usersController.update);

// Delete Users
router.post('/delete/:id', usersController.delete);

//Login User
router.get('/login', usersController.login);
router.post('/login',validationLogin,usersController.checkLogin)

//User logeado
router.get('/profile',usersController.logged)


module.exports = router;