const express = require("express");
const path = require("path");
const app = express();
const publicPath =  "public";

const rutasProductos= require('./routes/producto.js');
const rutasMain= require('./routes/main.js')


app.set("view engine", "ejs");


app.use(express.static(publicPath) );

app.listen(3030, () =>{
    console.log("servidor corriendo en el puerto 3030");
})

app.use('/producto', rutasProductos);
app.use('/', rutasMain)


