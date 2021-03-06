const express = require("express");
const path = require("path");
const app = express();
const publicPath =  "public";
const morgan = require('morgan');
const session = require('express-session');
const cookies = require('cookie-parser');

const productsRoutes= require('./routes/producto.js');
const userRoutes=require('./routes/users.js')
const rutasMain= require('./routes/main.js');
const cartRoutes= require('./routes/carrito.js')
const usersApi= require('./routes/apiUser.js')
const productsApi= require('./routes/apiProduct.js')

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const methodOverride = require('method-override');// put-delete

app.use(methodOverride('_method'))

app.use(morgan('dev'))

app.set("view engine", "ejs");

app.use(session({
    secret: "mensaje secreto",
    resave:  false,
    saveUninitialized: false,
}));

app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static(publicPath)); 

app.use(express.urlencoded({extended:false}));//post
app.use(express.json());


app.listen(3030, () =>{
    console.log("servidor corriendo en el puerto 3030");
})

/*********** Rutas ***********/

app.use('/products', productsRoutes);
app.use('/users', userRoutes);
app.use('/carrito', cartRoutes);
app.use('/', rutasMain);
app.use('/api/user', usersApi);
app.use('/api/product', productsApi);



