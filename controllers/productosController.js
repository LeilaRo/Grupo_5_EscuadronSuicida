const path= require('path');
const fs = require('fs');

const db = require('../src/database/models')

const controlador={
    index: function(){},

    productsList: (req, res)=>{
        db.Product.findAll(
            //{include: [{association: 'categories'}]}
        )
        .then(function(products){
            res.render('products/productsList', {products})
        })
    },
    productDetail: (req, res) =>{
        db.Product.findByPK(req.params.id)
            .then(function(idProduct){
                res.render('products/productDetail', {idProduct});
            })
    },
    createProductView: (req, res) => {
        res.render( "products/createProduct");
    },

    createProduct: (req, res)=>{
        db.Product.create({
            name:req.body.name,
            description: req.body.description,
            /*categorieId: req.body.categories,*/
            price: req.body.price,
            productImages:req.file.filename,
            colours:req.body.colours,
        });
        res.redirect("/products")
    },
    editProduct: (req, res) => {
        db.Product.findByPK(req.params.id)
            .then(function(idProduct){
                res.render('products/editProduct', {idProduct})
            })
    },
    updateProduct: (req, res)=>{
        db.Product.update({
            name:req.body.name,
            description: req.body.description,
            categoryId: req.body.categories,
            price: req.body.price,
            productImages:req.file.filename,
            colours:req.body.colours,
        }, {
            where:{
                id: req.params.id
            }
        }
        )
        res.redirect('/products')
    },
    deleteProduct: (req, res) =>{
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products')
      
    },
    /*search:(req,res) =>{
        db.Product.findOne({
            where: {
                name: req.body.search
            }
        }) .then
    }*/
    
}

module.exports= controlador;



    /*
    //Leer el archivo JSON de productos:
const productsFilePath = path.join(__dirname, '../data/products.json')
const jsonProducts = fs.readFileSync(productsFilePath, "utf-8");
//Traducir ese archivo json: luego lo usaremos en saveProduct para guardar los productos que se crean
const products = JSON.parse(jsonProducts);
    
    productsList: (req, res)=> {
		res.render('products/productsList', {products})

    
    productDetail: (req, res) =>{
        const id = req.params.id;
           const selectProduct = (id) =>{
            const idProduct = products.find(productSelected => productSelected.id == id);
            return idProduct;         
        }
        console.log(selectProduct(id));
        
        res.render('products/productDetail', {idProduct: selectProduct(id)});
    },
    },
    editProduct: (req, res) => { 
        const id = req.params.id;

            const selectProduct = (id) =>{
            const idProduct = products.find(productSelected => productSelected.id == id);
            return idProduct;         
        }
     
        res.render('products/editProduct', {idProduct: selectProduct(id)} );
    },
     updateProduct: (req, res) =>{
        let productUpdate = {        
            ...req.body,
            image:'default.jpg'
        }
        for (let index = 0; index < products.length; index++) {
            if(products[index].id == req.params.id){
                products[index] = {...products, ...productUpdate}
                console.log(products[index])
            }              
        }
        const updateProduct= JSON.stringify(products);
        fs.writeFileSync(productsFilePath, updateProduct, "utf-8")

        res.redirect('/products')

        }
        deleteProduct: (req, res) =>{
        res.redirect('/products')
      
    },*/