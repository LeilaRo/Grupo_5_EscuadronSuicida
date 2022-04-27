//const { DataTypes } = require("sequelize/types");
module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(30)
        },
        lastName: {
            type: DataTypes.STRING(30)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING
        },
        userImageId:{
            type: DataTypes.INTEGER,
        },
        // address: {
        //     type: DataTypes.STRING
        // },
        // city: {
        //     type: DataTypes.STRING(50)
        // },
        // province: {
        //     type: DataTypes.STRING(50)
        // },
        // phone: {
        //     type: DataTypes.INTEGER
        // },
        // /*birthDate:{
        //     type: DataTypes.DATETIME
        // },*/
        // country: {
        //     type: DataTypes.STRING(50)
        // },
        roleId: {
            type: DataTypes.STRING(30)
        }
    }
    let config = {
        tableName: 'users',
        timestamps:false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.UserImages, {    
            as: 'image', 
            foreignKey: 'userImageId',
            });
        User.belongsTo(models.Role, {
            as: 'roles',
            foreignKey: 'roleId'
        });
        {
        User.belongsToMany(models.ProductCart, {
                as: 'product',
                through: 'userCart',
                foreignKey: 'useCartId',
                otherKey: 'productoCartId',
                timestamps: 'false'

            })
        }


    };

    return User

}
