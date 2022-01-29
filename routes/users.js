const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usersController.js')

router.get("/login", usuarioController.login)

router.get("/register", usuarioController.register)
 

module.exports = router;