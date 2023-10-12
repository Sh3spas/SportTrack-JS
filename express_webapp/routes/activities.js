var express = require('express');
const session = require('express-session');
var router = express.Router();
var activity_dao = require('sport-track-db').activity_dao;


/* GET home page. */
router.get('/list', function(req, res, next) {
  if (!req.session.email) {
    res.redirect('/connect');
    return;
  }

  activity_dao.findByUser(req.session.email).then((rows) => {
    if(rows.length == 0){
      res.render('activities_list', {activities: []});
    }else{
      res.render('activities_list', {activities: rows});
    }
  });
});

router.post('/delete', function (req, res, next) {
  if (!req.session.email) {
    res.redirect('/connect');
    return;
  }

  activity_dao.delete(req.body.id).then(() => {
    res.redirect('/activities/list');
  });
});

module.exports = router;
