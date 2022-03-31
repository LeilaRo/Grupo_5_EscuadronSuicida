//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) =>{

    let alias = "role";
    let cols = {
        id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(25)
    }
}
    let config =  {
        tableName: 'role',
        TimesTamps: false
    }
    const Role = sequelize.define(alias, cols, config);

        Role.associate = function(models){
            Role.belongsTo(models.User, {
                foreignKey: 'role',
                as: 'roles'
            })

    }        
    return Role;
    
}