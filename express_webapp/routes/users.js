var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/* Inscription */

router.get('/add', function(req, res, next) {
    res.render('user_add_form',[]);
});

router.post('/add', function(req, res, next) {
    res.render('user_add_valid',[]);
});

router.get('/add/valid', function(req, res, next) {
    res.render('user_add_valid',[]);
});


/*Connexion*/

router.get('/connect', function(req, res, next) {
    res.render('user_connect_form',[]);
});

router.post('/connect', function(req, res, next) {
    res.render('user_connect_valid',[]);
});

router.get('/connect/valid', function(req, res, next) {
    res.render('user_connect_valid',[]);
});

/* Disconnect */

router.get('/disconnect', function(req, res, next) {
    res.render('user_disconnect',[]);
});

/* Update */
router.get('/update', function(req, res, next) {
    res.render('user_update',[]);
});

router.post('/update', function(req, res, next) {
    res.render('user_update',[]);
});




module.exports = router;