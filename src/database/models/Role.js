//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) =>{

    let alias = "Role";
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
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config);
    
    return Role;
    
}