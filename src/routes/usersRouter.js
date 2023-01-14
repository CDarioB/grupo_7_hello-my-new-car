const express = require ("express"); 
const router = express.Router();

const usersController = require('../controllers/usersController.js');

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validateLogin = require('../middlewares/validateLoginMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

//Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.processLogin)

/*router.get('/check', function(req, res){
    if (req.session.usuarioLogeado == undefined) {
        res.send('El usuario no está logeado')
    } else {
        res.send('El usuario logeado es ' + req.session.usuarioLogeado)
    }
})*/

//Recuperar cuenta de usuario
router.get('/recovery', usersController.recovery);

// Consulta de users
router.get('/', usersController.users);

//Crear Users
router.get('/create', guestMiddleware, usersController.create);
router.post('/new', usersController.newUsers);

// Modificar Users
router.get('/modificacion/:id',usersController.modificar); // Este sería del admin
router.post('/edit/:id',usersController.update);

// Delete Users
router.delete('/delete/:id', usersController.delete);

//Perfil de usuario
router.get('/profile', authMiddleware, usersController.profile)

module.exports = router;