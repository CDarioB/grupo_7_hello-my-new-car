const EXPRESS = require ("express"); 
let productosController = require('../controllers/productosController.js');

var ROUTER = EXPRESS.Router();
ROUTER.get('/', function(req,res){
    res.send('Esta es la respuesta de los usuarios');
});

module.exports = ROUTER;