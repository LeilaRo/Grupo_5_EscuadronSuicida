module.exports = (sequelize, DataTypes) => {

    let alias = "ProductImages"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING(255)
        }
    }
    let config = {
        tableName: 'productimages',
        TimesTamps: false
    }

    const ProductImages = sequelize.define(alias, cols, config);

    ProductImages.associate = function(models){
        ProductImages.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'productImagesId',

        });
        
    }

    return ProductImages;
}