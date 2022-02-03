const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usersController.js')

router.get("/", (req, res) => {
    res.render("index");
})

module.exports = router;