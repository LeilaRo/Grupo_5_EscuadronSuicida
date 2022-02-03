const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js')

const multer= require('multer');
const {body} = require('express-validator');


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

const validations = [
    body('first_name').notEmpty().withMessage('Debes completar el campo "Nombre".'),
    body('last_name').notEmpty().withMessage('Debes completar el campo "Apellido".'),
    body('email').isEmail().withMessage('Debes completar con un email válido.'),
    body('password').notEmpty().withMessage('Debes completar con una contraseña.')
    
]; 


router.get('/', userController.userList);

router.get("/register", userController.register);
router.post("/register",upload.single('userImage'), validations, userController.saveRegister);


router.get("/login", userController.login);
router.post("/login", validations, userController.saveLogin);


 

module.exports = router;