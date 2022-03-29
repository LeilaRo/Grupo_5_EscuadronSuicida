
module.exports = (sequelize, DataTypes) =>{

    const ProductCart = sequelize.define("productCart", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProduct:{
            type: DataTypes.INTEGER
        },
        idUser:{
            type: DataTypes.INTEGER
        },
        amount:{
            type: DataTypes.INTEGER
        },
        discount:{
            type: DataTypes.DECIMAL
        },
        totalPrice:{
            type: DataTypes.INTEGER
        },
    },
    {
        tableName: 'productCart',
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




