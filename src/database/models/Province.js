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

    Province.associate = function (models) {
        Province.belongsTo(models.Product, {   // una provincia puede tener N productos // Relacion (4)
            as: "province-products",
            foreignKey: 'province_id',
        })

        Province.belongsTo(models.Province, {   // una provincia puede tener N localidades // Relacion (6)
            as: "province-locations",
            foreignKey: 'province_id',
        })
    }

    return Province;
};