var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/* Inscription */
router.get('/add', (req, res, next) => {
  res.render('user_add_form', { error: null });
});

router.post('/add', (req, res, next) => {
  const { email, password, firstName, lastName, dateOfBirth, gender, height, weight } = req.body;
  const user = { email, password, firstName, lastName, dateOfBirth, gender, height, weight };

  user_dao.insert(user, (err) => {
    if (err) {
      // Gestion des erreurs SQLite
      res.render('user_add_form', { error: err.message });
    } else {
      res.render('user_add_valid', { email });
    }
  });
});

/* Modification du compte */
router.get('/update', function (req, res, next) {
    if (!req.session.email) {
    res.redirect('/connect');
    return;
  }
  
  res.render('user_update', []);
});

router.post('/update', function (req, res, next) {
  if (!req.session.email) {
    res.redirect('/connect');
    return;
  }

  const { password, firstName, lastName, dateOfBirth, gender, height, weight } = req.body;
  const user = { email: req.session.email, password, firstName, lastName, dateOfBirth, gender, height, weight };

  user_dao.update(user, (err) => {
    if (err) {
      // Gestion des erreurs SQLite
      res.render('user_update', { error: err.message });
    } else {
      req.session.user = user;
      req.session.fullName = user.firstName + ' ' + user.lastName;
      res.locals.session = req.session;
      res.render('user_update', { message: 'Informations mises à jour !' });
    }
  });
});

module.exports = router;
