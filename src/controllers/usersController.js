const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Categories = db.Category;
const Provinces = db.Province;
const Users = db.User;
const Rols = db.Rol;


const usersController = {
    users: function(req,res,next) {
        db.Rol.findAll()
        .then(roles =>{
        db.User.findAll({include: ['rol']}).then(users =>{
            res.render('./partials/users/users',{users,roles})})

        })
    },
    login: function(req, res, next) {
        res.render('login')
    },
    recovery: function(req,res,next) {
        res.render('accountRecover');
    },
    processLogin: function(req, res){
        //let errors = validationResult(req)
        db.User.findOne({
            where:{email: req.body.email}
        }).then((userToLogin)=>{
            if(userToLogin){
                let validatedPassword = bcrypt.compareSync(req.body.password, userToLogin.pass)
                console.log(userToLogin)
                if(validatedPassword){
                    console.log('Si ingresó')
                }
            }
            else{
     
            }
        })
        


        /*return res.render ('login', {
            errors:{
                email: {
                    msg:'Credenciales inválidas'
                }
            }
        })*/
    },
    create: function(req,res,next) {
        let allRoles;
        db.Rol.findAll()
            .then(roles => {
                allRoles = roles;
            }
        ).then( ()=>{
            res.render('register',{allRoles})
        })
    },
    newUsers: function(req,res) {       
            db.User.create({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    tel: req.body.tel,
                    email: req.body.email,
                    pass: req.body.pass,
                    image: 'default.jpg',
                    rol_id: 2,
                }
            ).then(() =>{
                res.redirect('../users');
            })
    },
    modificar: function(req,res,next) {
        let AllRoles;
        let AllUsers;
        let idUser = req.params.id;
        db.Rol.findAll()
        .then(roles =>{
            AllRoles = roles;
        })
        db.User.findAll()
        .then(users =>{
            AllUsers=users;
        })
        .then(()=>{
            res.render('./partials/users/modificarUsers', {AllRoles,AllUsers,idUser})
        })
    },
    update: function(req,res){
        if (req.file){
            let filename = req.file.filename;
            db.User.update({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                tel: req.body.tel,
                email: req.body.email,
                pass: req.body.pass,
                image: filename,
            },
            {
                where:{
                    id: req.params.id,
                }
            }).then(()=>{
                res.redirect('../');
            })
        }
        else{
            db.User.update({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                tel: req.body.tel,
                email: req.body.email,
                pass: req.body.pass,
            },
            {
                where:{
                    id: req.params.id,
                }
            }).then(()=>{
                res.redirect('../');
            })
        }
        
    },
    delete: (req,res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/")
    }
}

module.exports = usersController;