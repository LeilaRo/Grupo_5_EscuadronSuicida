const path= require('path');

const controlador={
    index: function(){},

    productDetail: (req, res) => { 
        res.render( "products/productDetail");
        
    },
    createProduct: (req, res) => {
        res.render( "products/createProduct");
    },
    
    editProduct: (req, res) => {
        res.render('products/editProduct');
    },
/* Sprint 4*/
//Juan
    productsList: (req, res)=> {
    },
//Leila
    saveProduct: (req, res) =>{
        //Obtener los datos de req.body
        //Escribir esos datos en json, usar fs y escribirlo en el archivo
        //res.redirect({ruta a donde quiero que se redirija ej: "/products"})
    },
    saveEditProduct: (req, res) =>{

    },
    deleteProduct: (req, res) =>{

    },

    
}
module.exports= controlador;