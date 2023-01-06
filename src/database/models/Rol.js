module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };

    let config = {
        tableName: 'rol',
        timestamps: false
    };

    const Rol = sequelize.define(alias, cols, config); 

    Rol.associate = function (models) {
        Rol.belongsTo(models.User, {  // un rol puede tener varios usuarios // Relacion (1)
            as: "rol-users",
            foreignKey: 'rol_id',
        })
    }

    return Rol;
};