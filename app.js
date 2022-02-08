const express = require("express");
const path = require("path");
const app = express();
const publicPath =  "public";
const morgan = require('morgan');
const session = require('express-session');

const productsRoutes= require('./routes/producto.js');
const userRoutes=require('./routes/users.js')
const rutasMain= require('./routes/main.js');

const methodOverride = require('method-override');// put-delete
app.use(morgan('dev'))

app.set("view engine", "ejs");

app.use(session({
    secret: "mensaje secreto",
    resave:  false,
    saveUninitialized: false,
}));

app.use(express.static(publicPath)); 

app.use(express.urlencoded({extended:false}));//post
app.use(express.json());

app.use(methodOverride('_method'))


app.listen(3030, () =>{
    console.log("servidor corriendo en el puerto 3030");
})

/*********** Rutas ***********/

app.use('/products', productsRoutes);
app.use('/users', userRoutes);
app.use('/', rutasMain)


