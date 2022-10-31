let productosController = {
    index: function(req,res,next) {
    res.render('./partials/producto/formularioIndex');
    },
    crear: function(req,res,next) {
    res.render('./partials/producto/crearProducto');
    },
    modificar: function(req,res,next) {
    res.render('./partials/producto/modificarProducto');
    },
    menuModificar: function(req,res,next) {
        res.render('./partials/producto/modificarMenu');
    },
    detalle : function(req,res,next) {
    idPage = [req.params.id];
    res.render('detalleDeCompra', {id: idPage});
    }
}

module.exports = productosController;