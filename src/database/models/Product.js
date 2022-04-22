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
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        productImages: {
            type: DataTypes.INTEGER
        },
        colours: {
            type: DataTypes.STRING
        }
    } 
    const config = {        
    
        tableName: 'products',
        TimesTamps: false
    }
    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        })

        Product.belongsToMany(models.ProductCart, {
            as: 'productCart',
            through: 'prodCart',
            foreignKey: 'idProduct',
            otherKey: 'idProductCart',
            timeStamps: 'false'

        })
    };
    return Product
}





