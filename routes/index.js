var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index', { title: 'follow fritz' });
});

/* GET New User page. */
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

/* POST to Add User Service */
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

router.get('/login', function (req, res) {
    res.render('./pages/login.ejs', {
        message: req.flash('loginMessage')

    });
});
module.exports = router;