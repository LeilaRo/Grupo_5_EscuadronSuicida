//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) =>{

    const Role = sequelize.define("Role", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(25)
        }},
        {
            tableName: 'role',
            TimesTamps: false
        }
        );

        Role.associate = function(models){
            Role.belongsTo(models.User, {
                foreignKey: 'role',
                as: 'roles'
            })
        return Role;
    
    }
}