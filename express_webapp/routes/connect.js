var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/*Connexion*/
router.get('/', function(req, res, next) {
    res.render('user_connect_form',[]);
});

router.post('/', function (req, res, next) {
    const { email, password } = req.body;

    user_dao.findByKey(email, (err, user) => {
        if (err) {
            // Gestion des erreurs SQLite
            res.render('user_connect_form', { error: err.message });
        } else {
            if (user && user.password === password) {
                req.session.user = user;
                req.session.email = user.email;
                req.session.fullname = `${user.firstName} ${user.lastName}`;

                res.render('user_connect_valid', { fullname: req.session.fullname });
            } else {
                res.render('user_connect_form', { error: 'Adresse e-mail ou mot de passe incorrect' });
            }
        }
    });
});

module.exports = router;