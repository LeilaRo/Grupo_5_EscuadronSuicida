
module.exports = (sequelize, DataTypes) => {
    let alias = "ProductCart"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productCartId: {
            type: DataTypes.INTEGER
        },
        userCartId: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.INTEGER
        },
        discount: {
            type: DataTypes.DECIMAL
        },
        totalPrice: {
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'productcart',
        timestamps: false
    }

    const ProductCart = sequelize.define(alias, cols, config);
    
    ProductCart.associate = function (models) {
        /*ProductCart.belongsToMany(models.Product, {
            as: 'products',
            through: 'prodCart',
            foreignKey: 'prodCartId',
            otherKey: 'prodId',
            timestamps: 'false'

        })
        ProductCart.belongsToMany(models.User, {
            as: 'users',
            through: 'userCart',
            foreignKey: 'productoCartId',
            otherKey: 'useCartId',
            timestamps: 'false'

        })*/
    };
    return ProductCart

}




