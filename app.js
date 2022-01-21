const express = require("express");
const path = require("path");
const app = express();
const publicPath =  "public";

const rutasProductos= require('./routes/producto.js');
const rutasMain= require('./routes/main.js');

const methodOverride = require('method-override');// put-delete

app.set("view engine", "ejs");

app.use(express.static(publicPath)); 

app.use(express.urlencoded({extended:false}));//post
app.use(express.json());

app.use(methodOverride('_method'))


app.listen(3030, () =>{
    console.log("servidor corriendo en el puerto 3030");
})

app.use('/products', rutasProductos);
app.use('/', rutasMain)


