


module.exports = (sequelize, dataTypes) =>{

    const ProductCart = sequelize.define("ProductCart", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProduct:{
            type: dataTypes.INTEGER
        },
        idUser:{
            type: dataTypes.INTEGER
        },
        amount:{
            type: dataTypes.INTEGER
        },
        discount:{
            type: dataTypes.DECIMAL
        },
        totalPrice:{
            type: dataTypes.INTEGER
        },
        date:{
            type: dataTypes.TIMESTAMP
        }
    },
    {
        tableName: 'ProductCart',
        TimesTamps: false
    }
    );
    ProductCart.associate = function(models){
        ProductCart.belongsToMany(models.Product,{
            as:'products',
            through:'prodCart',
            foreignKey:'idProductCart',
            otherKey:'idProduct',
            timeStamps:'false'

        })
        ProductCart.belongsToMany(models.User,{
            as:'users',
            through:'userCart',
            foreignKey:'idProductCart',
            otherKey:'idUser',
            timeStamps:'false'

        })
    };
    return ProductCart

}




