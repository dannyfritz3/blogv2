var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index', { title: 'follow fritz' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('pages/userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;