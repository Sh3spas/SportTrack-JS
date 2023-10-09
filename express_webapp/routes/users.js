var express = require('express');
var router = express.Router();

var user_dao = require('sport-track-db').user_dao;

/* Inscription */
router.get('/add', (req, res, next) => {
  res.render('user_add_form', { error: null });
});

router.post('/add', (req, res, next) => {
  const { email, password, firstName, lastName, dateOfBirth, gender, height, weight } = req.body;
  const values = { email, password, firstName, lastName, dateOfBirth, gender, height, weight };

  user_dao.insert(values, (err) => {
    if (err) {
      // Gestion des erreurs SQLite
      res.render('user_add_form', { error: err.message });
    } else {
      res.render('user_add_valid', { email });
    }
  });
});

/* Modification du compte */
router.get('/update', function(req, res, next) {
    res.render('user_update',[]);
});

router.post('/update', function(req, res, next) {
    res.render('user_update',[]);
});

module.exports = router;
