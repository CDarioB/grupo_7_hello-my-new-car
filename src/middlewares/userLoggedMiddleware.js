function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false

    if (req.session && req.session.userLoggedIn) {
        res.locals.isLogged = true
    }
    next()
}

module.exports = userLoggedMiddleware