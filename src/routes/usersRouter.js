const express = require ("express"); 
const router = express.Router();

const usersController = require('../controllers/usersController.js');
const uploadFile = require('../middlewares/multerMiddleware');

// Consulta de users

router.get('/', usersController.users);

//Crear Users
router.get('/create',usersController.create);
router.post('/new', usersController.newUsers);

// Modificar Users
router.get('/modificacion',usersController.modificar); // Este sería del admin

// Delete Users
router.delete('/delete/:id', usersController.delete);

module.exports = router;