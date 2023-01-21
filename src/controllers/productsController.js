//const fs = require('fs');
//const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Categories = db.Category;
const Provinces = db.Province;

const { validationResult } = require('express-validator');

function rederCreateProducts(req,res,errorMapped){
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
        res.render('./product/createProducts',
            {
                allProvinces: allProvinces,
                allCategory: allCategory, 
                errors: errorMapped,
                oldData: req.body
                //oldFiles: req.files
            });
    })
}

function rederEditProducts(res,id,oldProductPkId,errorMapped){
    let allCategory;
    let productPkId;
    let allProvinces;
    
    if (id) {
        Products.findByPk(
                id,
                {include: ['province']} //{include: ['province','category']}
        ).then(prodId => { 
            productPkId = prodId;
            productPkId.img = productPkId.img.split(",");
        })
    } else {
        productPkId = oldProductPkId;
    }
        
    Provinces.findAll()
        .then(provinces => {
            allProvinces = provinces
        }).then(() =>{
            Categories.findAll()
                .then(categories => {
                        allCategory = categories;
                    }).then(() => {
                        res.render('./product/editProduct',
                        {
                            product: productPkId,
                            allProvinces: allProvinces,
                            allCategory: allCategory,
                            errors: errorMapped,
                        });
                    });
        })
}

const productsController = {
    products: function(req,res,next) {
        Products.findAll({
            include: ['province','category']
        }).then(products => {
           for(let i = 0; i < products.length; i++){
            products[i].img = products[i].img.split(",");
           }
           res.render('./product/products',{products});
        });
    },
    index: function(req,res,next) {
        res.render('./product/formularioIndex');
    },
    create: function(req,res,next) {
        rederCreateProducts(req,res,null);
    },
    newProducts: function(req,res) {
        
        const resultValidation = validationResult(req);
        
        // console.log('*********************************************************************');
        // console.log('resultValidation -> '+ JSON.stringify(resultValidation.mapped()));
        // console.log('*********************************************************************');

        if (resultValidation.errors.length > 0) {
            rederCreateProducts(req,res,resultValidation.mapped());
        } else {

            let images = [];
            
            let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
            let price = parseInt(req.body.priceCar); 
        
            for (let i=0; i < req.files.length; i++)
                images.push(req.files[i].filename);
            
            try { 
            
                Products    
                    .create({
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
                        user_id: 1
                    }
                ).then(() =>{
                    res.redirect('/products/index');
                })
            } catch(error) {
                console.log(error)
            }
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
           res.render('./product/productListModify',{products});
        });
    },

    edit: (req, res, next) => {
        rederEditProducts(res,req.params.id,null,null);
    },
    update: (req,res,next) =>{

        let idCar = req.params.id;

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
           /*
            let oldProductPkId = {
                "id": idCar,
                "references": req.body.refCar,
                "brand": req.body.brandCar,
                "model": req.body.modelYearCar,
                "mileage": req.body.mileageCar,
                "price": req.body.priceCar,
                "discount_percentage": req.body.discountCar,
                "img": req.body.auxImagesCar, //req.body.imagesCar,
                "category_id": req.body.categoryTypeCar,
                "province_id": req.body.provinceCar
            };
            rederEditProducts(res,null,oldProductPkId,resultValidation.mapped());
            */
            rederEditProducts(res,idCar,null,resultValidation.mapped());
        } else {
            let Car;
            let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
            let price = parseInt(req.body.priceCar);
            db.Product.findByPk(idCar)
            .then((carro)=>{
                Car = carro;
                images = Car.img.split(",");
                for (let i=0; i < req.files.length; i++)
                    images.push(req.files[i].filename);
                return images;
            })
            .then(()=>{
                Products.update({
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
                    user_id: 1
                },{
                    where: {
                        id: idCar
                    }
                })
            })
            .then(()=>{
                Products.findAll({
                    include: ['province']
                }).then(products => {
                for(let i = 0; i < products.length; i++){
                    products[i].img = products[i].img.split(",");
                }
                res.render('product/productListModify',{products});
                });
            
            })
        }
    },
    menuModificar: function(req,res,next) {
        res.render('./product/modificarMenu');
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