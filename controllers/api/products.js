const { promisify } = require('util');

const Product = require('../../src/database/models').Product
const Categories = require('../../src/database/models').Category
const productImages = require('../../src/database/models').ProductImages


module.exports = {
    index: async (req, res) => {
        try {
            let allProducts = await Product.findAll();
            let allCategories = await Categories.findAll({include: {all: true}});
            let lastProduct = await Product.findAll({order: [['id', 'DESC']], limit: 1});

            return res.status(200).json({
                count: allProducts.length,
                countByCategory: allCategories.map(category => Object({
                    id: category.id, 
                    name: category.name, 
                    count: category.product.length
                })),
                products: allProducts.map(product => Object({
                    id: product.id, 
                    name: product.name, 
                    description: product.description,
                    detail: 'http://localhost:3030/api/product/'+ product.id,
                })),
                lastProduct: lastProduct,

                status: 200
            });

        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    show: async (req, res) => {
        try {
            let product = await Product.findByPk(req.params.id, { include: { all: true } });
            let allCategories = await Categories.findAll({include: {all: true}});
            let imageProduct = await productImages.findByPk(product.productImagesId, {include: {all: true}});
            

            return res.status(200).json({
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.categoryId,
                price: product.price,
                productImages: imageProduct.url,
                

            
            })

        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
}