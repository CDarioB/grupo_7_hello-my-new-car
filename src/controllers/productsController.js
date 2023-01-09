const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Categories = db.Category;
const Provinces = db.Province;
//const Locations = db.Location;

//const productsFilePath = path.join(__dirname, '../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    products: function(req,res,next) {
        Products.findAll({
            include: ['province','category']
        }).then(products => {
           for(let i = 0; i < products.length; i++){
            products[i].img = products[i].img.split(",");
           }
           res.render('./partials/product/products',{products});
        });
    },
    index: function(req,res,next) {
        res.render('./partials/product/formularioIndex');
    },
    create: function(req,res,next) {
        let allProvinces;
        let allCategory;
        Provinces.findAll()
            .then(provinces => {
                allProvinces = provinces;
            })
        Categories.findAll()
            .then(categories => {
                allCategory = categories;
        }).then( ()=>{
            res.render('./partials/product/createProducts',{allProvinces: allProvinces, allCategory: allCategory})
        })
    },
    newProducts: function(req,res) {
        let images = [];
        
        let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
        let price = parseInt(req.body.priceCar); 
       
        for (let i=0; i < req.files.length; i++)
            images.push(req.files[i].filename);
        
        try { 
        
            Products    
                .create({
                    //created_at: moment(dateNow).locale('es-us').format('YYYY-MM-DD'),
                    //updated_at: moment(dateNow).locale('es-us').format('YYYY-MM-DD'),
                    references: req.body.refCar,
                    brand: req.body.brandCar,
                    model: req.body.modelYearCar,
                    mileage: req.body.mileageCar,
                    price: price,
                    discount_percentage: discount,
                    discount_price: price - ((price * discount)/100),
                    img: images.join(','),
                    category_id: req.body.categoryTypeCar,
                    province_id: req.body.provinceCar,
                    // location_id: req.body.cityCar,
                    user_id: 1
                }
            ).then(() =>{
                res.redirect('/products/index');
                //res.render('./partials/product/formularioIndex');
            })
        } catch(error) {
            console.log(error)
        }
    },
    modify: (req,res,next) => {
        Products.findAll({
            include: ['province']
            //include: ['province','category']
        }).then(products => {
           for(let i = 0; i < products.length; i++){
            products[i].img = products[i].img.split(",");
           }
           res.render('partials/product/productListModify',{products});
        });
    },

    edit: (req, res, next) => {
        //const id = req.params.id;
        //const product = products.find(product => product.prd_id == id);
        let allCategory;
        let productPkId;
        let allProvinces;
        
        Products.findByPk(
                req.params.id,
                {include: ['province']} //{include: ['province','category']}
        ).then(prodId => { 
            productPkId = prodId;
            productPkId.img = productPkId.img.split(",");
        })
        
        Provinces.findAll()
            .then(provinces => {
                allProvinces = provinces
        })

        Categories.findAll()
            .then(categories => {
                allCategory = categories;
            }).then(() => {
                res.render('partials/product/editProduct',{product: productPkId, allProvinces: allProvinces, allCategory: allCategory});
        });
    },
    update: (req, res) => {
        let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
        let price = parseInt(req.body.priceCar);
        
        Products.update({
            //created_at: moment(dateNow).locale('es-us').format('YYYY-MM-DD'),
            //updated_at: moment(dateNow).locale('es-us').format('YYYY-MM-DD'),
            references: req.body.refCar,
            brand: req.body.brandCar,
            model: req.body.modelYearCar,
            mileage: req.body.mileageCar,
            price: price,
            discount_percentage: discount,
            discount_price: price - ((price * discount)/100),
            //img: images.join(','),
            category_id: req.body.categoryTypeCar,
            province_id: req.body.provinceCar,
            // location_id: req.body.cityCar,
            user_id: 1
        },{
            where: {
                id: req.params.id
            }
        }).then(()=> {
            Products.findAll({
                include: ['province']
                //include: ['province','category']
            }).then(products => {
               for(let i = 0; i < products.length; i++){
                products[i].img = products[i].img.split(",");
               }
               res.render('partials/product/productListModify',{products});
            });
        })
    },
    menuModificar: function(req,res,next) {
        res.render('./partials/product/modificarMenu');
    },
    detail : function(req,res,next) {
        db.Product.findAll({
            include: ['province','category']
        }).then(products => {
            for(let i = 0; i < products.length; i++){
             products[i].img = products[i].img.split(",");
            }
            let product = products.find(p => p.id == req.params.id )
            res.render('detalleDeCompra', {product});
         });
     
    },
    delete: function(req,res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/products/edit")
    },
    deleteImg: function(req,res){
        let products = db.Product.findAll({
            include: ['province','category']})
        .then(function(products){
        let idProduct = req.params.idProduct;
        let idImage = req.params.idImage;
        const Product = products[idProduct-1];
        Product.img = Product.img.split(",");
        Product.img = Product.img.filter((imagen) => imagen !== Product.img[idImage]);
        console.log(Product.img[idImage])
        Product.img = Product.img.join();
        db.Product.update({
            img : Product.img,
        },{
            where: {
                id: idProduct,
            }
        })
        res.redirect("/products/edit/"+ idProduct + "#containerEditimg")})
    }
}

module.exports = productsController;