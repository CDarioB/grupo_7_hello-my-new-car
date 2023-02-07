const db = require('../database/models');

const apiUsersController = {
    usersData: async (req, res) => {
        let response = {
            count: 0,
            users: []
        };

        let users = await db.User.findAll();

        response.count =  users.length;
        response.users = users.map( user => {
            let usersDetail = {
                id: user.id,
                name:  user.last_name + ", " + user.first_name,
                email: user.email,
                detail: `/api/users/${user.id}`
            }
            return usersDetail
        });
        
        return res.json(response);
    },
    
    userDataById: async (req, res) => {
        let user = await db.User.findByPk(req.params.id);

        let response = {
            id: user.id,
            name:  user.first_name,
            surname: user.last_name,
            tel: user.tel,
            email: user.email,
            image: `http://localhost:${process.env.PORT}/img/users/${user.image}`
        };
            
        return res.json(response);
    }
}

module.exports = apiUsersController;



