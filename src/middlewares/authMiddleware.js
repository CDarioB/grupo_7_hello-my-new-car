function authMiddleware(req, res, next){
    if(!req.session.userLoggedIn){
        return res.redirect('/users/login')
    }
    next()
}

module.exports = authMiddleware