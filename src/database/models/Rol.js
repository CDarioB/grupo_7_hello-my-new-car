module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: 'rol',
        timestamps: false
    };

    const Rol = sequelize.define(alias, cols, config); 

    Rol.associate = function (models) {
        Rol.hasMany(models.User, {  // un rol puede tener varios usuarios // Relacion (1)
            as: "user",
            foreignKey: 'rol_id',
        })
    }

    return Rol;
};