module.exports = (sequelize, DataTypes) => {

    let alias = "UserImages"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING(255)
        }
    }
    let config = {
        tableName: 'userImages',
        TimesTamps: false
    }

    const UserImages = sequelize.define(alias, cols, config);
    
    UserImages.associate = function (models) {
        UserImages.hasMany(models.User, {    
            as: 'user', 
            foreignKey: 'userImageId',
        })
    
    return UserImages;

}
}