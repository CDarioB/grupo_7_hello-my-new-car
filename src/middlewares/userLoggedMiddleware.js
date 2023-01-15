function userLoggedMiddleware(req, res, next){
    res.locals.isLoggedIn = false

    if (req.session.userLoggedIn) {
        res.locals.isLoggedIn = true
    }
    next()
}

module.exports = userLoggedMiddleware