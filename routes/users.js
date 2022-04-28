const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js')
const path = require('path');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const multer= require('multer');

const {body} = require('express-validator');

const validations = [
    body('first_name').notEmpty().withMessage('Debes completar el campo "Nombre'),
    body('last_name').notEmpty().withMessage('Debes completar el campo "Apellido'),
    body('email')
    .notEmpty().withMessage('Debes completar este campo').bail()
    .isEmail().withMessage('Debes completar con un email válido'),

    //Revisar si será necesario agregar una imagen al perfil
    body('image').custom((value, { req })=>{
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

    body('password').notEmpty().withMessage('Debes completar con una contraseña.'),
  
];


//Configuración de Multer:
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'./public/imagenes/users');
    },
    filename:(req, file, cb) =>{
        cb(null, `${Date.now()}--${file.originalname}`);
    }

})
const upload= multer({storage});

router.get('/profile/:userId', userController.profile);

router.get("/register", guestMiddleware, userController.register);
router.post("/register",upload.single('image'), validations, userController.saveRegister);

router.get("/login", guestMiddleware, userController.login);
router.post("/login", validations, userController.saveLogin);

router.get("/profile", authMiddleware, userController.profile);
router.get('/logout', userController.logout);

module.exports = router;