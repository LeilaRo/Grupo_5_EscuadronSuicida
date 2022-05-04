const path = require('path');
const fs = require('fs');



const { validationResult } = require('express-validator');
const db = require('../src/database/models/Product');
const Product = require('../src/database/models').Product
const ProductImages = require('../src/database/models').ProductImages

const controlador = {
    index: function () { },
    productsList: async (req, res) => {
        try {
            const products = await Product.findAll({ include: { all: true } });
            res.render('products/productsList', { products: products });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }

    },
    productDetail: async (req, res) => {
        let id = Number(req.params.id);
        try {
            const product = await Product.findByPk(id, { include: { all: true } });
            //res.send({product})
            res.render('products/productDetail', { idProduct: product });
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },

    createProductView: (req, res) => {
        res.render("products/createProduct");
    },
    createProduct: async (req, res) => {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('products/createProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            let imagenProducto = await ProductImages.create({
                url: req.file.filename
            });
            //Se crea el producto y se carga las imágenes
            let productNew = await Product.create({
                name: req.body.product_name,
                categoryId: req.body.category,
                description: req.body.description,
                price: Number(req.body.price),
                productImagesId: imagenProducto.id
            });
            return res.redirect('/products/' + productNew.id)
        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }
    },

    editProduct: async (req, res) => {
        const id = Number(req.params.id);
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('products/editProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            const products = await Product.findByPk(id);
            res.render('products/editProduct', { idProduct: products });
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },

    updateProduct: async (req, res) => {
        console.log("Se actualizo el prod.")
        const resultValidation = validationResult(req);
        /* if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors)
            return res.render('products/editProduct', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }; */
        try {
            let id = Number(req.body.id);
            console.log(req.body)
            let productToModify = await Product.findByPk(id);
            await productToModify.update({
                name: req.body.product_name,
                categoryId: req.body.category,
                description: req.body.description,
                price: Number(req.body.price),
                productImages: req.body.file

            });

            await productToModify.save() 
            return res.redirect('/products');
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },

   deleteProduct: (req, res) => {
        Product.destroy({
            where: {
                id: req.params.id
            },
        })
        .then(()=>{
            return res.redirect('/products')
        }) .catch((error) =>{
            res.status(500).send({message: error.message})
        })
        

    },
     
    /*search:(req,res) =>{
        db.Product.findOne({
            where: {
                name: req.body.search
            }
        }) .then
    }*/


}

module.exports = controlador;
