const express = require('express');
const router = express.Router();
const productosController= require('../controllers/productosController.js');
const multer = require('multer');

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
router.get("/create", productosController.createProduct);

//Acción de creación (a donde se envía el formulario) de POST
router.post("/create", upload.single('productImage'),productosController.saveProduct);

//Detalle de un producto particular
router.get("/:id", productosController.productDetail);

//Formulario de edición de productos
router.get("/:id/edit", productosController.editProduct);

//Acción de edición (a donde se envía el formulario):
router.put("/:id", productosController.updateProduct);

//Borrar

router.delete("/:id", productosController.deleteProduct);




/* Preguntar si es necesario crear un carritoController y mover a la ruta de abajo, o si lo llevamos a productoController*/
router.get("/productCart", (req, res) => {
    res.render(path.resolve(__dirname, '../views/products/editProduct'));
})





module.exports= router