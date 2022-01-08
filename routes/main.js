const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.render( "index");
})

router.get("/users/login", (req, res) => {
    res.render("login");
})


router.get("/users/register", (req, res) => {
    res.render( "register");
    
})
 

module.exports = router;