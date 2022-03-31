module.exports = (sequelize, DataTypes) => {

    let alias = "image"
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
        tableName: 'images',
        TimesTamps: false
    }

    const Image = sequelize.define(alias, cols, config);
    return Image;

}