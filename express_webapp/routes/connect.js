var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/*Connexion*/

router.get('/', function(req, res, next) {
    res.render('user_connect_form',[]);
});

router.post('/', function(req, res, next) {
    res.render('user_connect_valid',[]);
});

router.get('/valid', function(req, res, next) {
    res.render('user_connect_valid',[]);
});





module.exports = router;