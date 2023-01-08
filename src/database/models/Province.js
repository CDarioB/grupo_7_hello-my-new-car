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

    Province.associate = function(models) {
        Province.hasMany(models.Location, {  // 1 provincia puede tener varias localidades  // Relacion (3)
            as: "locations",
            foreignKey: 'province_id',
        })
    }

    

    return Province;
};