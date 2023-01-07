module.exports = (sequelize, dataTypes) => {
    let alias = 'Province';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        province: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };

    let config = {
        tableName: 'provinces',
        timestamps: false
    };

    const Province = sequelize.define(alias, cols, config); 

    return Province;
};