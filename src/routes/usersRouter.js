const express = require ("express"); 
const router = express.Router();

const usersController = require('../controllers/usersController.js');
const uploadFile = require('../middlewares/multerMiddleware');

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

module.exports = router;