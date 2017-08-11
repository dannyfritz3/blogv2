module.exports = function (app, passport) {
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureReditect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};