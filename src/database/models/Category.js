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
        Category.belongsTo(models.Product, {  // una categoria puede tener varios productos // Relacion (3)
            as: "category-products",
            foreignKey: 'category_id',
        })
    }

    return Category;
};