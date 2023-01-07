module.exports = (sequelize, dataTypes) => {
    let alias = 'Location';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        province_id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'locations',
        timestamps: false
    };

    const Location = sequelize.define(alias, cols, config); 

    return Location;
};