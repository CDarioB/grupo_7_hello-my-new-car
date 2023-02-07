const express = require ("express"); 
const router = express.Router();
const apiUsersController = require('../controllers/apiUsersController.js');


router.get('/', apiUsersController.usersData);
router.get('/:id', apiUsersController.userDataById);


module.exports = router;