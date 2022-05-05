const express = require('express');
const router = express.Router();
const carritoController= require('../controllers/carritoController.js');
const path= require('path');

router.get("/", carritoController.productCart)

module.exports= router