var express = require('express');
var router = express.Router();
var BlogPost = require('../models/blogpost')
var fs = require('fs-extra');
var multer = require('multer');
var util = require('util');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://dannyrf3:dbpassword123@ds053419.mlab.com:53419/heroku_kw2vt8z6';
var ObjectId = require('mongodb').ObjectID;

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function (passport) {

    /* GET Home Page */
    router.get('/', function (req, res) {
        res.render('pages/index', { user: req.user });
    });

    /* GET Blog Page */
    router.get('/blog', function (req, res) {
        var db = req.db;
        var collection = db.get('blogposts');
        collection.find({}, {}, function (e, docs) {
            res.render('pages/blog', {
                "blogposts": docs,
                user: req.user
            });
        })
    });

    /* GET Map Page */
    router.get('/map', function (req, res) {
        res.render('pages/map', { user: req.user });
    });

    /* GET AboutMe Page */
    router.get('/aboutme', function (req, res) {
        res.render('pages/aboutme', { user: req.user });
    });

    /* GET Admin Page */
    router.get('/admin', isAuthenticated, function (req, res) {
        res.render('pages/admin', { user: req.user });
    });

    /* Handle Blog Post POST*/
    router.post('/postblog', function (req, res) {
        MongoClient.connect(url, function (err, db) {
            // read the img file from tmp in-memory location
            var newImg = fs.readFileSync(req.file.path);
            // encode the file as a base64 string.
            var encImg = Buffer(newImg).toString('base64');
            var data = req.db;
            var collection = data.get('blogposts');
            collection.count({},function(err, ID) {
            // console.log(encImg);
            // define your new document
            var newBlog = {
                id: ID,
                title: req.body.title,
                date: req.body.date,
                city: req.body.city,
                country: req.body.country,
                content: req.body.content,
                contentType: req.file.mimetype,
                size: req.file.size,
                image: encImg
            };
            db.collection('blogposts')
                .insert(newBlog, function (err, result) {
                    if (err) { console.log(err); };
                    var newoid = new ObjectId(result.ops[0]._id);
                    fs.remove(req.file.path, function (err) {
                        if (err) { console.log(err) };
                        res.render('pages/index', { title: 'Thanks for the Picture!' });
                    });
                });
            });
        });
    });

    /* GET edit page */
    router.post('/edit', function (req, res) {
        var db = req.db;
        var collection = db.get('blogposts');
        collection.find({title: req.body.editTitle}, function (e, docs) {
            res.render('pages/edit', {
                "blog": docs,
                req: req,
                collection: collection,
                id: req.body.identification,
                title: req.body.editTitle,
                date: req.body.editDate,
                city: req.body.editCity,
                country: req.body.editCountry,
                // image: req.body.editImage,
                content: req.body.editContent,
                user: req.user
            });
        })
    });

    /* Handle postblog POST */
    router.post('/editpost', function (req, res) {
        var newImg = fs.readFileSync(req.file.path);
        // encode the file as a base64 string.
        var encImg = Buffer(newImg).toString('base64');
        MongoClient.connect(url, function (err, db) {
            db.collection('blogposts').updateOne(
                {"id": parseInt(req.body.identification)},
                {$set: {"title": req.body.title, "date": req.body.date, "city": req.body.city, "country": req.body.country, "content": req.body.content, "contentType": req.file.mimetype, "image": encImg}}
            ).then(function(result) {
                res.redirect('blog');
            })
        });
    });

    /* GET login page. */
    router.get('/login', function (req, res) {
        // Display the Login page with any flash message, if any
        res.render('pages/login', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: 'admin',
        failureRedirect: 'login',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/signup', isAuthenticated, function (req, res) {
        res.render('pages/register', { message: req.flash('message') });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: 'admin',
        failureRedirect: 'signup',
        failureFlash: true
    }));

    /* Handle Logout */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}