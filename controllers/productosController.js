const path= require('path');
const fs = require('fs');

//Leer el archivo JSON de productos:
const productsFilePath = path.join(__dirname, '../data/products.json')
const jsonProducts = fs.readFileSync(productsFilePath, "utf-8");
//Traducir ese archivo json: luego lo usaremos en saveProduct para guardar los productos que se crean
const products = JSON.parse(jsonProducts);

const controlador={
    index: function(){},

    productsList: (req, res)=> {
		res.render('products/productsList', {products})
    },

    productDetail: (req, res) =>{

        const id = req.params.id;

            const selectProduct = (id) =>{
            const idProduct = products.find(productSelected => productSelected.id == id);
            return idProduct;         
        }
        console.log(selectProduct(id));
        
        res.render('products/productDetail', {idProduct: selectProduct(id)});
    },

    createProduct: (req, res) => {
        res.render( "products/createProduct");
    },

    editProduct: (req, res) => { 

        const id = req.params.id;

            const selectProduct = (id) =>{
            const idProduct = products.find(productSelected => productSelected.id == id);
            return idProduct;         
        }
     
        res.render('products/editProduct', {idProduct: selectProduct(id)} );
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
 
    updateProduct: (req, res) =>{
        let productUpdate = {
            ...req.body,
            image:'default.jpg'
        }

        console.log(productUpdate)

        //pensar de que manera voy a editar mi variable de json para que 
        //agregue la info que actualizo.

        //idProduct= req.params.id

    },
    deleteProduct: (req, res) =>{

    },


    
}
module.exports= controlador;