module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
        tableName: 'category',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function (models) {
        Category.hasMany(models.Product, {  // 1 categoria puede estar varios productos // Relacion (3)
            as: "products",
            foreignKey: 'category_id',
        })
    }

    return Category;
};