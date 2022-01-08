const controlador={
    index: function(){},

    detalleProducto: (req, res) => {
        res.render( "productDetail");
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