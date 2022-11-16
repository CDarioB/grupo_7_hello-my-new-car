const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    users: function(req,res,next) {
        res.render('./partials/users/users',{ users: users}); //check
    },
    create: function(req,res,next) {
        res.render('register');
    },
    newUsers: function(req,res) {
        const newUsers = {
            "usr_id": users[users.length - 1].usr_id + 1,
            "usr_firs_name": req.body.usr_firs_name,
            "usr_last_name": req.body.usr_last_name,
            "usr_tel": req.body.usr_tel,
            "usr_email": req.body.usr_email,
            "usr_pass": req.body.usr_pass
        };
        users.push(newUsers);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        res.redirect('/users/');
    },
    modificar: function(req,res,next) {
        res.render('./partials/users/modificarUsers');
    },
    delete: (req,res) => {
        const id = req.params.id;
        const finalUsers = users.filter(user => user.usr_id != id)
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));
        res.redirect('/users/');
    }
}

module.exports = usersController;