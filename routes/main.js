const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController.js')

router.get("/", (req, res) => {
    res.render( "index");
})

router.get("/login", usuarioController.login)

router.get("/register", usuarioController.register)
 

module.exports = router;