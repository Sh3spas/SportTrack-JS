var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

router.get('/add', function(req, res, next) {
    res.render('user_add_form',[]);
});

module.exports = router;