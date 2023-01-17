function userLoggedMiddleware(req, res, next){
    res.locals.isLoggedIn = false

    if (req.session.userLoggedIn) {
        res.locals.isLoggedIn = true
        res.locals.userLoggedIn = req.session.userLoggedIn
    }
    next()
}

module.exports = userLoggedMiddleware