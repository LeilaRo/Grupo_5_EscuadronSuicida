const express = require('express');
const router = express.Router();
const productosController= require('../controllers/productosController.js');
const multer = require('multer');

//Configuración de Multer:
const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null,'./public/imagenes/products');
    },
    filename:(req, res, cb) =>{
        cb(null, `${Date.now()}--{file.originalname}`)
    }

})

const upload= multer({storage})

/*1- products (GET) listado de productos */
router.get("/", productosController.productsList);

/* 2 products/create (GET)
Formulario de creación de productos */
router.get("/create", productosController.createProduct);
/*4. /products (POST)
Acción de creación (a donde se envía el formulario)*/
router.post("/create", upload.single('productImage'),productosController.saveProduct);

/*3. /products/:id (GET)
Detalle de un producto particular */
router.get("/:id", productosController.productDetail);


/*5. /products/:id/edit (GET)
Formulario de edición de productos
*/
router.get("/:id/edit", productosController.editProduct);
/* 
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
*/
router.put("/:id", productosController.saveEditProduct);

/*
7. /products/:id (DELETE)
Acción de borrado
*/
router.delete("/:id", productosController.deleteProduct);

/* Preguntar si es necesario crear un carritoController y mover a la ruta de abajo, o si lo llevamos a productoController*/
router.get("/productCart", (req, res) => {
    res.render(path.resolve(__dirname, '../views/products/editProduct'));
})





module.exports= router