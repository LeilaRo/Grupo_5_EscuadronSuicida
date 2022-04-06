//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    let alias = "user";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING(50)
        },
        province: {
            type: DataTypes.STRING(50)
        },
        phone: {
            type: DataTypes.INTEGER
        },
        /*birthDate:{
            type: DataTypes.DATETIME
        },*/
        country: {
            type: DataTypes.STRING(50)
        },
        role: {
            type: DataTypes.STRING(30)
        }
    }
    let config = {

        tableName: 'Users',
        TimesTamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.role, {
            foreignKey: 'role',
            as: 'roles'
        });
        {
        User.belongsToMany(models.productCart, {
                as: 'product',
                through: 'userCart',
                foreignKey: 'idUser',
                otherKey: 'idProductCart',
                timeStamps: 'false'

            })
        }


    };

    return User

}