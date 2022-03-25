

module.exports = (sequelize, DataTypes) =>{

    const Image = sequelize.define("Image", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url:{
            type: DataTypes.STRING(255)
        }},
        {
            tableName: 'images',
            TimesTamps: false
        }
        );
        return Image;
    
    }