//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) =>{

    const User = sequelize.define("User", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(30)
        },
        lastName: {
            type: DataTypes.STRING(30)
        },
        email:{
            type: DataTypes.STRING(50)
        },
        password:{
            type: DataTypes.STRING
        },
        address:{
            type: DataTypes.STRING
        },
        city:{
            type: DataTypes.STRING(50)
        },
        province:{
            type: DataTypes.STRING(50)
        },
        phone:{
            type: DataTypes.INTEGER
        },
        birthDate:{
            type: DataTypes.DATETIME
        },
        country:{
            type: DataTypes.STRING(50)
        },
        role:{
            type: DataTypes.STRING(30)
        }
    },
    {
        tableName: 'Users',
        TimesTamps: false
    }
    );
    User.associate = function(models){
        User.belongsTo(models.Role, {
            foreignKey: 'role',
            as: 'roles'
        });
    };
    {
        User.belongsToMany(models.ProductCart,{
            as:'product',
            through:'userCart',
            foreignKey:'idUser',
            otherKey:'idProductCart',
            timeStamps:'false'

        })
    }
    return User

}