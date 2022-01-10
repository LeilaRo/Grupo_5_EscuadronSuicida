const express = require('express');
const router = express.Router();
const productosController= require('../controllers/productosController.js');

router.get("/productDetail", productosController.detalleProducto);


router.get("/createProduct", productosController.crearProducto);

router.get("/editProduct", productosController.editarProducto)

/* Preguntar si es necesario crear un carritoController y mover a la ruta de abajo, o si lo llevamos a productoController*/
router.get("/productCart", (req, res) => {
    res.render( "productCart");
})




module.exports= router