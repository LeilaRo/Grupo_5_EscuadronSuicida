//const { timeStamp } = require("console");
//const { DataTypes } = require("sequelize/types");


module.exports = (sequelize, DataTypes) => {

    let alias = "Product"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(50)
        },
        price: {
            type: DataTypes.DECIMAL
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        productImagesId: {
            type: DataTypes.INTEGER
        },

    } 
    const config = {        
    
        tableName: 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.ProductImages, {    
            as: 'productimages', 
            foreignKey: 'productImagesId',
            });
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        })

        Product.belongsToMany(models.ProductCart, {
            as: 'productCart',
            through: 'prodCart',
            foreignKey: 'prodId',
            otherKey: 'prodCartId',
            timestamps: 'false'
        })
    };
    return Product
}





