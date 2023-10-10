var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/* Disconnect */

router.get('/', function(req, res, next) {
    req.session.destroy();
    res.locals.session = req.session;
    res.render('user_disconnect',[]);
});






module.exports = router;