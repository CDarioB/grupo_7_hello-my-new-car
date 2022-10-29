let productosController = {
    
    detalle : function(req,res,next) {
    idPage = [req.params.id];
    res.render('detalleDeCompra', {id: idPage});
    }
}

module.exports = productosController;