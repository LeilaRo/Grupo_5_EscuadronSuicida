const path= require('path');

const controlador={
    index: function(){},

    detalleProducto: (req, res) => {
        res.render(path.resolve(__dirname, '../views/products/productDetail'));
        /*res.render( "productDetail");/* Corregir */
    },
    crearProducto: (req, res) => {
        res.render(path.resolve(__dirname, '../views/products/createProduct'));
    },
    
    editarProducto: (req, res) => {
        res.render(path.resolve(__dirname, '../views/products/editProduct'));
    },
    
}
module.exports= controlador;