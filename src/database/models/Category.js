//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) =>{

    const Category = sequelize.define("Category", {
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(30)
        }},
        {
            tableName: 'categories',
            timesTamps: false
        }
        );
        Category.associate = function(models){
            Category.hasMany(models.Product, {
                foreignKey: 'categoryId',
                as: 'products'
            })

        };
        return Category;
    
    }