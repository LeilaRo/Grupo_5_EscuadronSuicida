const path= require('path');
const fs = require('fs');

//Leer el archivo JSON de productos:
const productsFilePath = path.join(__dirname, '../data/products.json')
const jsonProducts = fs.readFileSync(productsFilePath, "utf-8");
//Traducir ese archivo json: luego lo usaremos en saveProduct para guardar los productos que se crean
const products = JSON.parse(jsonProducts);

const controlador={
    index: function(){},

    productDetail: (req, res) => { 
        res.render( "products/productDetail");
        
    },
    createProduct: (req, res) => {
        res.render( "products/createProduct");
    },
    saveProduct: (req, res) =>{
        //Obtener los datos de req.body
        let newProduct={
                id: products[products.length - 1].id +1,
                ...req.body,
                image: 'default.jpg'
            } 
        console.log(newProduct)
        //Escribir esos datos en json, usar fs y escribirlo en el archivo:
        products.push(newProduct);
        const newJsonProduct = JSON.stringify(products);
    
        fs.writeFileSync(productsFilePath, newJsonProduct, "utf-8")

        //res.redirect({ruta a donde quiero que se redirija ej: "/products"})
        res.redirect("/products/productsList");
        },
    
    editProduct: (req, res) => {
        res.render('products/editProduct');
    },
/* Sprint 4*/
//Juan
    productsList: (req, res)=> {
    },
//Leila
   
    saveEditProduct: (req, res) =>{

    },
    deleteProduct: (req, res) =>{

    },

    
}
module.exports= controlador;