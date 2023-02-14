//const fs = require('fs');
//const path = require('path');
const db = require('../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");
//const moment = require('moment');

const { validationResult } = require('express-validator');


const productsController = {
    products: function(req,res,next) {
        db.Product.findAll({
            include: ['province','category']
        }).then(products => {
           for(let i = 0; i < products.length; i++){
            products[i].img = products[i].img.split(",");
           }
           res.render('./product/products',{products});
        });
    },
    index: async function(req,res,next) {
        const userDb = await db.User.findByPk(parseInt(req.cookies.userId), {include: ['rol']});
        let userType = userDb.rol.type == 'USER' ? 'USUARIO':'ADMINISTRADOR';
        res.render('./product/formularioIndex',{userData: {name: userDb.first_name, rol: userType}}); // aqui
    },
    create: async function(req,res,next) {
        const provincesDb = db.Province.findAll();
        const categoriesDb = db.Category.findAll();
            
        const [auxProvinces, auxCategories] = await Promise.all([provincesDb, categoriesDb]);
            
        const provinces = auxProvinces.map(elemen =>  {
            let result= {id: elemen.dataValues.id, province: elemen.dataValues.province}
            return result
        });

        const categories = auxCategories.map(elemen =>  {
            let result= {id: elemen.dataValues.id, type: elemen.dataValues.type}
            return result
        });
        
        res.render('./product/createProducts',{
            allProvinces: provinces,
            allCategory: categories, 
            errors: null,
            oldData: req.body
        });
    },
    newProducts: async function(req,res) {
        
        const resultValidation = validationResult(req);
        
        console.log(resultValidation.errors);
        console.log(req.body);
        console.log(req.files);

        if (resultValidation.errors.length > 0) {
            const provincesDb = db.Province.findAll();
            const categoriesDb = db.Category.findAll();
                
            const [auxProvinces, auxCategories] = await Promise.all([provincesDb, categoriesDb]);
                
            const provinces = auxProvinces.map(elemen =>  {
                let result= {id: elemen.dataValues.id, province: elemen.dataValues.province}
                return result
            });

            
            const categories = auxCategories.map(elemen =>  {
                let result= {id: elemen.dataValues.id, type: elemen.dataValues.type}
                return result
            });
            
            res.render('./product/createProducts',{
                allProvinces: provinces,
                allCategory: categories, 
                errors: resultValidation.mapped(),
                oldData: req.body
                //oldFiles: req.files
            });
        } else {

            let images = [];
            
            let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
            let price = parseInt(req.body.priceCar); 
        
            for (let i=0; i < req.files.length; i++)
                images.push(req.files[i].filename);
            
            try { 
                db.Product    
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
                        user_id: parseInt(req.cookies.userId)
                    }
                ).then(() =>{
                    res.redirect('/products/index');
                })
            } catch(error) {
                console.log(error)
            }
        }
    },
    modify: async (req,res,next) => {
        let products=[];

        const userDb = await db.User.findByPk(parseInt(req.cookies.userId), {include: ['rol']});
        
        
        products = userDb.rol.type == 'ADMIN' ? await db.Product.findAll({include: ['province']}) : 
            await db.Product.findAll({include: ['province'], where: { user_id: parseInt(req.cookies.userId)}}); 
            
        
        for(let i = 0; i < products.length; i++)
                products[i].img = products[i].img.split(",");
        //res.render('./product/productListModify',{products});
        res.render('./product/productListModify',{products});
        
    },
    edit: async (req, res, next) => {
        const productsDb =  db.Product.findByPk(req.params.id, {include: ['province']}); 
        const provincesDb = db.Province.findAll();
        const categoriesDb = db.Category.findAll();
        
        const [auxProducts, auxProvinces, auxCategories] = await Promise.all([productsDb, provincesDb, categoriesDb]);
        
        auxProducts.dataValues.img = auxProducts.dataValues.img.split(",");

        const provinces = auxProvinces.map(elemen =>  {
            let result= {id: elemen.dataValues.id, province: elemen.dataValues.province}
            return result
        });

        const categories = auxCategories.map(elemen =>  {
            let result= {id: elemen.dataValues.id, type: elemen.dataValues.type}
            return result
        });
        
                
        res.render('./product/editProduct',
        {
            product: auxProducts.dataValues,
            allProvinces: provinces,
            allCategory: categories,
            errors: null,
        });

    },
    update: async (req,res,next) =>{
        let idCar = req.params.id;
        
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            const provincesDb = db.Province.findAll();
            const categoriesDb = db.Category.findAll();
            const [auxProvinces, auxCategories] = await Promise.all([provincesDb, categoriesDb]);
            
            const provinces = auxProvinces.map(elemen =>  {
                let result= {id: elemen.dataValues.id, province: elemen.dataValues.province}
                return result
            });
    
            const categories = auxCategories.map(elemen =>  {
                let result= {id: elemen.dataValues.id, type: elemen.dataValues.type}
                return result
            });

            let oldProductById = {
                "id": idCar,
                "references": req.body.refCar,
                "brand": req.body.brandCar,
                "model": req.body.modelYearCar,
                "mileage": req.body.mileageCar,
                "price": req.body.priceCar,
                "discount_percentage": req.body.discountCar,
                "img": req.body.images.split(","), 
                "category_id": req.body.categoryTypeCar,
                "province_id": req.body.provinceCar
            };

            res.render('./product/editProduct',{
                product: oldProductById,
                allProvinces: provinces,
                allCategory: categories,
                errors: resultValidation.mapped(),
            });
        } else {
            let discount = req.body.discountCar ? parseInt(req.body.discountCar) : 0;
            let price = parseInt(req.body.priceCar);
            
            let images = req.body.images.split(",")
            for (let i=0; i < req.files.length; i++)
                images.push(req.files[i].filename);
            
            db.Product.update({
                    references: req.body.refCar,
                    brand: req.body.brandCar,
                    model: req.body.modelYearCar,
                    mileage: req.body.mileageCar,
                    price: price,
                    discount_percentage: discount,
                    discount_price: price - ((price * discount)/100),
                    img: images.join(','),
                    category_id: req.body.categoryTypeCar,
                    province_id: req.body.provinceCar
                    },{ 
                        where: { id: idCar }
                    }
            ).then(() => {
                db.Product.findAll(
                    {include: ['province']}
                ).then(products => {
                    for(let i = 0; i < products.length; i++)
                        products[i].img = products[i].img.split(",");
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
    }
}

module.exports = productsController;