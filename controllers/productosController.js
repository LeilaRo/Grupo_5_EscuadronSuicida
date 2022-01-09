const controlador={
    index: function(){},

    detalleProducto: (req, res) => {
        res.send("detalle de producto")
        
        /*res.render( "productDetail");/* Corregir */
    },
    /*
    crearProducto: (req, res) => {
        res.render( "createProduct");
    },
    editarProducto: (req, res) => {
        res.render( "editProduct");
    },
    */
}
module.exports= controlador;