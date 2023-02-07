const db = require('../database/models');

const apiProductsController = {
    productsData: async (req, res) => {
        let response = {
            count: 0,
            countByCategory: {},
            products: [],
        };

        let products = await db.Product.findAll({include: ['category']});
        response.count =  products.length;
        response.products = products.map( product => {
            let productDetail = {
                id: product.id,
                brand:  product.brand,
                description: product.references,
                model: product.model,
                mileage: product.mileage,
                price: product.price,
                discount_percentage: product.discount_percentage,
                discount_price: product.discount_price,
                category: product.category,
                detail: `/api/products/${product.id}`
            }

            return productDetail
        });

        let categories = await db.Category.findAll({include: ['products']});
        categories.forEach(category =>  response.countByCategory[category.type] = category.products.length);

        return res.json(response);
    },

    productDataById: async (req, res) => {
        let product = await db.Product.findByPk(
            req.params.id,
            {include: ['category','province','user']}
        );

        let urlimages = product.img.split(",");
        urlimages = urlimages.map(img =>  `http://localhost:${process.env.PORT}/img/products/${img}`);

        let response = {
            id: product.id,
            brand:  product.brand,
            description: product.references,
            model: product.model,
            mileage: product.mileage,
            price: product.price,
            discount_percentage: product.discount_percentage,
            discount_price: product.discount_price,
            asociations: [product.category, product.province, product.user],
            // category: product.category,
            // province: product.province,
            // user: product.user,
            created_at: product.created_at,
            updated_at: product.updated_at,
            deleted_at: product.deleted_at,
            images: urlimages
        }
            
        return res.json(response);
    }
}

module.exports = apiProductsController;