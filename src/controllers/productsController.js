const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    products: function(req,res,next) {
        res.render('./partials/product/products',{ products});
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
    modify: (req,res,next) => {
        res.render('partials/product/productListModify', {
                products
            });
    },

    edit: (req, res, next) => {
        const id = req.params.id;
        const product = products.find(product => product.prd_id == id);
        res.render('partials/product/editProduct', {
            product, products, id
        })
    },
    update: (req, res) => {
        const id =req.params.id;
        const productToEdit = products.find(product => product.id == id);

        const editProduct = {
            prd_id: prd_id,
            prd_references: req.body.prd_references,
            prd_brand: req.body.prd_brand,
            prd_province: req.body.prd_province,
            prd_city: req.body.prd_city,
            prd_category_type: req.body.prd_type,
            prd_model_year: req.body.prd_model_year,
            prd_mileage: req.body.prd_mileage,
            prd_price: req.body.prd_price,
            prd_discount_Percentage: req.body.prd_discount_Percentage,
            prd_discountprice: price - ((price * discount)/100),
            img: req.file ? req.file.filename : productToEdit.prd_img,
        }

        products.forEach((product, index) => {
            if (product.prd_id == id) {
                products [index] = editProduct;
            }
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));
        res.redirect('./partials/product/productListModify')
    },

    menuModificar: function(req,res,next) {
        res.render('./partials/product/modificarMenu');
    },
    detail : function(req,res,next) {
        let objectData = products.find(p => p.prd_id == req.params.id )
        res.render('detalleDeCompra', { product: objectData});
    },
    delete: function(req,res) {
        const id = req.params.id;
        const finalProducts = products.filter(product => product.prd_id != id)
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));
        res.redirect('/products/index');
    }
}

module.exports = productsController;