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
const {body} = require('express-validator');

const validations = [
    body('product_name').notEmpty().withMessage('Debes completar el nombre del producto'),
    body('price').notEmpty().withMessage('Debes completar este campo'),
    body('description')
    .notEmpty().withMessage('Debes completar este campo').bail(),
    //Revisar si será necesario agregar una imagen al perfil
    body('productimage').custom((value, { req })=>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if(!file){
            throw new Error('Debes subir una imagen');
        }
        else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(',')}`)
            }
        }
        return true;
    }),
  
];

//Listado de productos
router.get("/", productosController.productsList);

//Formulario de creación de productos
router.get("/create", /*isAdminMiddleware, */productosController.createProductView);

//Acción de creación (a donde se envía el formulario) de POST
router.post("/create", upload.single('productImage'), productosController.createProduct);

//Detalle de un producto particular
router.get("/:id", productosController.productDetail);

//Formulario de edición de productos
router.get("/:id/edit", /*isAdminMiddleware, */productosController.editProduct);

//Acción de edición (a donde se envía el formulario):
router.put("/:id", productosController.updateProduct);

//Borrar

router.delete("/:id", productosController.deleteProduct);


module.exports= router