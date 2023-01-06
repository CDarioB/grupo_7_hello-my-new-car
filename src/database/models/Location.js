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

    /*Location.associate = function (models) {
        Province.belongsTo(models.Product, {   // una localidad puede tener N productos // Relacion (5)
            as: "location-products",
            foreignKey: 'location_id',
        })

        Product.hasMany(models.Province, { // N Localidades puede tener 1 provincia // Relacion (6)
            as: "locations-province", 
            foreignKey: "province_id"
        })
    }*/

    return Location;
};