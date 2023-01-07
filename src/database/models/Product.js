module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        //created_at: dataTypes.TIMESTAMP,
        //updated_at: dataTypes.TIMESTAMP,
        references: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        brand: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        model: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        mileage: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(15, 3).UNSIGNED,
            allowNull: false
        },
        discount_percentage: dataTypes.INTEGER.UNSIGNED,
        discount_price: dataTypes.INTEGER.UNSIGNED,
        img: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        category_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        province_id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            allowNull: false
        },
        location_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Product = sequelize.define(alias, cols, config); 

    Product.associate = function(models) {
        Product.belongsTo(models.User, { // 1 productos puede tener 1 usuario // Relacion (2)
            as: "user", 
            foreignKey: "user_id"
        })

        Product.hasMany(models.Category, { // N productos puede tener 1 categoria // Relacion (3)
            as: "products-category", 
            foreignKey: "category_id"
        })

        Product.belongsTo(models.Province, { // 1 productos puede tener 1 provincia // Relacion (4)
            as: "province", 
            foreignKey: "province_id"
        })

    }

    return Product;
};