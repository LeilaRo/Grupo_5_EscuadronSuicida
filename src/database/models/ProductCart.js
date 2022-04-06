
module.exports = (sequelize, DataTypes) => {
    let alias = "productCart"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProduct: {
            type: DataTypes.INTEGER
        },
        idUser: {
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
        tableName: 'productCart',
        TimesTamps: false
    }

    const ProductCart = sequelize.define(alias, cols, config);
    
    ProductCart.associate = function (models) {
        ProductCart.belongsToMany(models.product, {
            as: 'products',
            through: 'prodCart',
            foreignKey: 'idProductCart',
            otherKey: 'idProduct',
            timeStamps: 'false'

        })
        ProductCart.belongsToMany(models.user, {
            as: 'users',
            through: 'userCart',
            foreignKey: 'idProductCart',
            otherKey: 'idUser',
            timeStamps: 'false'

        })
    };
    return ProductCart

}




