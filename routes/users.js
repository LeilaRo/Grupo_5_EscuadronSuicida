const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js')

const multer= require('multer');

const {body} = require('express-validator');

const validations = [
    body('first_name').notEmpty().withMessage('Debes completar el campo "Nombre".'),
    body('last_name').notEmpty().withMessage('Debes completar el campo "Apellido".'),
    body('email')
    .notEmpty().withMessage('Debes completar este campo').bail()
    .isEmail().withMessage('Debes completar con un email válido.'),
    //Revisar si será necesario agregar una imagen al perfil
    body('userImage').custom((value, { req })=>{
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

    body('password').notEmpty().withMessage('Debes completar con una contraseña.')
    
]; 


//Configuración de Multer:
const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null,'./public/imagenes/users');
    },
    filename:(req, res, cb) =>{
        cb(null, `${Date.now()}--{file.originalname}`);
    }

})
const upload= multer({storage});




router.get('/profile/:userId', userController.profile);

router.get("/register", userController.register);
router.post("/register",upload.single('userImage'), validations, userController.saveRegister);


router.get("/login", userController.login);
router.post("/login", userController.saveLogin);


 

module.exports = router;