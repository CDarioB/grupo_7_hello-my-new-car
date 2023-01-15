const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

// ********** para leer el JSON temporal probando login***********
const usersFilePath = path.join(__dirname, '../data/users.json')// ruta del archivo .json donde están todos los héroes (simula bd)

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
                if(validatedPassword){
                    delete userToLogin.pass //esto no me funciona, se supone que no debe mostrar el password
                    req.session.userLoggedIn = userToLogin
                    return res.redirect('/users/profile')
                }else{
                    return res.render ('login', {
                        errors:{
                            email: {
                                msg:'Contrasena inválida'
                            }
                        }
                    })     
                }
            }else{
                return res.render ('login', {
                    errors:{
                        email: {
                            msg:'No se encuentra este email en nuestra base de datos'
                        }
                    }
                })     
            }
        })
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
                    pass: bcrypt.hashSync(req.body.pass,10),
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
            res.render('./partials/users/modificarUsers',{AllRoles,AllUsers,idUser})
        })
    },
    update: function(req,res){
        db.User.update({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            pass: bcrypt.hashSync(req.body.pass,10),
            image: 'default.jpg',
        },
        {
            where:{
                id: req.params.id,
            }
        }).then(()=>{

            res.redirect('../');
        })
    },
    delete: (req,res) => {
        const id = req.params.id;
        const finalUsers = users.filter(user => user.usr_id != id)
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));
        res.redirect('/users/');
    },
    profile: (req, res) =>{
        res.render('./partials/users/profile', {
            user: req.session.userLoggedIn
        })
    },
    logout: (req, res)=>{
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = usersController;