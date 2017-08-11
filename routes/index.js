var express = require('express');
var router = express.Router();
var BlogPost = require('../models/blogpost')

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

    /* GET Home Page */
	router.get('/', function(req, res){
		res.render('pages/index', { user: req.user });
    });

    /* GET Blog Page */
	router.get('/blog', function(req, res){
		res.render('pages/blog', { user: req.user });
    });

    /* GET Map Page */
	router.get('/map', function(req, res){
		res.render('pages/map', { user: req.user });
    });

    /* GET AboutMe Page */
	router.get('/aboutme', function(req, res){
		res.render('pages/aboutme', { user: req.user });
    });

    /* GET Admin Page */
    router.get('/admin', isAuthenticated, function(req, res){
        res.render('pages/admin', {user: req.user });
    });

    /* Handle Blog Post POST*/
    router.post('/postblog', function(req, res) {
        var db = req.db;

        var title = req.body.title;
        var city = req.body.city;
        var country = req.body.country;
        var image = req.body.image;
        var content = req.body.content;
        
        var newblog = new BlogPost();

        newblog.title = title;
        newblog.city = city;
        newblog.country = country;
        newblog.image = image;
        newblog.content = content;

        newblog.save(function(err) {
            if (err) {
                console.log('Error in Saving blog: ' +err);
                throw err;
            }
            console.log('User Registration successful');
            return done(null, newUser);
        });
    });

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('pages/login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: 'admin',
		failureRedirect: 'login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', isAuthenticated, function(req, res){
		res.render('pages/register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: 'admin',
		failureRedirect: 'signup',
		failureFlash : true  
	}));

	/* Handle Logout */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}