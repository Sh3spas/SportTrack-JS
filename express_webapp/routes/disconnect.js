var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/* Disconnect */

router.get('/', function(req, res, next) {
    if(req.session.user){
        req.session.destroy();
        res.locals.session = req.session;
        res.render('user_disconnect',[]);
    }
    else{
        res.redirect('/connect');
    }
});






module.exports = router;