 function guestMiddleware(req, res, next){
    if(req.session.userLoggedIn){
        return res.redirect('/users/profile')
    }
    next()
}

module.exports = guestMiddleware