const express = require ("express"); 
const router = express.Router();
const apiProductsController = require('../controllers/apiProductsController.js');

router.get('/', apiProductsController.productsData);
router.get('/:id', apiProductsController.productDataById);


module.exports = router;