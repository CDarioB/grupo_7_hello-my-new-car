const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    products: function(req,res,next) {
        res.render('./partials/product/products',{ products: products});
    },
    index: function(req,res,next) {
        res.render('./partials/product/formularioIndex');
    },
    create: function(req,res,next) {
        res.render('./partials/product/createProducts');
    },
    newProducts:function(req,res) {
        let imgList = [];
        let img = {};
        for (let i=0; i < req.files.length; i++) {
            img = {
                "img_id": i+1,
                "img_fileName": "/img/"+req.files[i].filename
            }; 

            imgList.push(img);
        }
        
        let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
        let price = parseInt(req.body.priceCar); 

        let newProducts = {
            "prd_id": products[products.length - 1].prd_id + 1,
            "prd_references": req.body.refCar,
            "prd_brand": req.body.brandCar,
            "prd_province": req.body.provinceCar,
            "prd_city": req.body.cityCar,
            "prd_category_type": req.body.categoryTypeCar,
            "prd_model_year": req.body.modelYearCar,
            "prd_mileage": req.body.mileageCar,
            "prd_price": price, //req.body.priceCar,
            "prd_discount_Percentage": discount,
            "prd_discountprice": price - ((price * discount)/100),
            "prd_img": imgList
        };
        products.push(newProducts);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect('/products/index');
        //res.render('./partials/product/formularioIndex');
    },
    modificar: function(req,res,next) {
        res.render('./partials/product/modificarProducto');
    },
    menuModificar: function(req,res,next) {
        res.render('./partials/product/modificarMenu');
    },
    detail : function(req,res,next) {
        let objectData = products.find(p => p.prd_id == req.params.id )
        res.render('detalleDeCompra', { product: objectData});
    },
    delete: (req,res) => {
        const id = req.params.id;
        const finalProducts = products.filter(product => product.prd_id != id)
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));
        res.redirect('/products/index');
    }
}

module.exports = productsController;