const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Categories = db.Category;
const Provinces = db.Province;

const { validationResult } = require('express-validator');

const apiProductsController = {
    
}

module.exports = apiProductsController;