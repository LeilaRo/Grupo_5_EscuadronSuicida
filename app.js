const express = require("express");

const path = require("path");

const app = express();

app.set("view engine", "ejs");

const publicPath =  "public";
app.use(express.static(publicPath) );

app.listen(3030, () =>{
    console.log("servidor corriendo en el puerto 3030");
})

app.get("/", (req, res) => {
    res.render( "index");
})

app.get("/productCart", (req, res) => {
    res.render( "productCart");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/productDetail", (req, res) => {
    res.render( "productDetail");
})

app.get("/register", (req, res) => {
    res.render( "register");
    
})
