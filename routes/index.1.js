var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
        return next();
    }
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = function(passport) {

    /*GET login page. */
    router.get('/login', function (req, res) {
        res.render('pages/login', { message: req.flash('message') });
    });

    /* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
    }));
    
    /* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
    });
    
    /* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
    }));

    /* GET Index Page */
	router.get('/', function(req, res){
		res.render('/pages/index', { user: req.user });
    });
    
    /* GET Blog Page */
	router.get('/blog', function(req, res){
		res.render('/pages/blog', { user: req.user });
    });
    
    /* GET Map Page */
	router.get('/map', function(req, res){
		res.render('/pages/map', { user: req.user });
    });
    
    /* GET AboutMe Page */
	router.get('/aboutme', function(req, res){
		res.render('/pages/aboutme', { user: req.user });
    }, console.log('working'));
    
    /* GET Admin Page */
	router.get('/admin', isAuthenticated, function(req, res){
		res.render('/pages/admin', { user: req.user });
    }, console.log('crash'));
    
    /* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
    });
    
    return router;

    /* GET New User page.
    router.get('/newuser', function (req, res) {
        res.render('pages/newuser', { title: 'Add New User' });
    });

    router.get('/userlist', function (req, res) {
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({}, {}, function (e, docs) {
            res.render('pages/userlist', {
                "userlist": docs
            });
        });
    });
    /* POST to Add User Service
    router.post('/adduser', function (req, res) {

        // Set our internal DB variable
        var db = req.db;

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.email;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username": userName,
            "email": userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
        });
    });
    */
}