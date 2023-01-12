module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        tel: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        pass: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rol_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    };

    const User = sequelize.define(alias, cols, config); 

    User.associate = function(models) {
        User.belongsTo(models.Rol, { // un usuario puede tener 1 rol // Relacion (1)
            as: "rol", 
            foreignKey: "id"
        })

        User.hasMany(models.Product, {  // 1 usuario puede tener muschos productos // Relacion (2)
            as: "products",
            foreignKey: 'user_id',
        })
    }

    return User;
};