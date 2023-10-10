var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.render('activities_list');
});

router.get('/add', function(req, res, next) {
    res.render('upload');
});

module.exports = router;
