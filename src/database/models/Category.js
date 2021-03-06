//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {

    let alias = "Category"
    let cols = {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(30)
        }
    }
    let config = {
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config)

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'categoryId'
            
        })

    };
    return Category;

}