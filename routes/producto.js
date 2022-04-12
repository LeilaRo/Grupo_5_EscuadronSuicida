const express = require('express');
const router = express.Router();
const productosController= require('../controllers/productosController.js');
const multer = require('multer');
//const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

//Configuración de Multer:
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'./public/imagenes/products');
    },
    filename:(req, file, cb) =>{
        cb(null, `${Date.now()}--${file.originalname}`)
    }

})
const upload= multer({storage})

//Listado de productos
router.get("/", productosController.productsList);

//Formulario de creación de productos
router.get("/create", /*isAdminMiddleware, */productosController.createProductView);

//Acción de creación (a donde se envía el formulario) de POST
router.post("/create", upload.single('productImage'),productosController.createProduct);

//Detalle de un producto particular
router.get("/:id", productosController.productDetail);

//Formulario de edición de productos
router.get("/:id/edit", /*isAdminMiddleware, */productosController.editProduct);

//Acción de edición (a donde se envía el formulario):
router.put("/:id", productosController.updateProduct);

//Borrar

router.delete("/:id", productosController.deleteProduct);


module.exports= router