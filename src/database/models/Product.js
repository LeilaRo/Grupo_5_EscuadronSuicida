//const { timeStamp } = require("console");
//const { DataTypes } = require("sequelize/types");


module.exports = (sequelize, DataTypes) =>{

    const Product = sequelize.define("Products", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.DECIMAL
        },
        categoryId:{
            type: DataTypes.INTEGER
        },
        productImages:{
            type: DataTypes.INTEGER
        },
        colours:{
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'products',
        TimesTamps: false
    }
    );
    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'categories'
        })

        Product.belongsToMany(models.ProductCart,{
            as:'productCart',
            through:'prodCart',
            foreignKey:'idProduct',
            otherKey:'idProductCart',
            timeStamps:'false'

        })
    };


    return Product
}





