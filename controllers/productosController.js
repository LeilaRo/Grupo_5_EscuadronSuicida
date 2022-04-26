const path= require('path');
const fs = require('fs');

const {validationResult} = require('express-validator');
const db = require('../src/database/models/Product')

const controlador={
    index: function(){},
    productsList: async (req, res)=>{
        try {
            const products = await db.Product.findAll({include: {all: true}});
            res.render('products/productsList', {product: products});
        }
        catch (error) {
            res.status(500).send({message: error.message});
        }

    },
    productDetail: async (req, res) => {
        let id = Number(req.params.id);
        try {
            const product = await db.Product.findByPk(id, {include: {all: true}});
            //res.send({product})
            res.render('products/productDetail', {idProduct: product});
        } catch (error) {
            res.status(500).send({message: error.message})
        }}, 

    createProductView: (req, res) => {
        res.render( "products/createProduct");
    },
    createProduct: async (req,res) =>{
        try{
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('products/createProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            //Se crea el producto y se carga las imágenes
            let productNew = await db.Product.create({
                name: req.body.product_name,
                category: req.body.category,
                description: req.body.description,
                price: Number(req.body.price),
                productImagesId: req.file.filename});
            return res.redirect('/products/productDetail/' + productNew.id)
        }
        catch (error) {
            res.status(500).send({message: error.message})
        }
    },
    /*createProduct: (req, res)=>{
       try{ let resultValidation = validationResult(req);
        if(!resultValidation.isEmpty()){
            return res.render('products/createProduct', {msgError: resultValidation.mapped})
        }
        else{
            db.Product.create({
                name: req.body.product_name,
                description: req.body.description,
                price: req.body.price,
                categoryId: req.body.categories,
                productImagesId:req.file.filename,
            })
            
        } res.redirect("/products")
       } catch (error) {
        res.status(500).send({msg: error.message})
    }        
    }*/
    editProduct: (req, res) => {
        db.Product.findByPK(req.params.id)
            .then(function(idProduct){
                res.render('products/editProduct', {idProduct})
            })
    },
    updateProduct: (req, res)=>{
        db.Product.update({
            name:req.body.product_name,
            description: req.body.description,
            categoryId: req.body.categories,
            price: req.body.price,
            productImagesId:req.file.filename,
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
