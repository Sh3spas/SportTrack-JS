var express = require('express');
var router = express.Router();
var { calculDistanceTrajet, calculateHeartRateAll, calculDuree } = require('../functions');
var formidable = require('formidable');
var fs = require('fs');

var activity_dao = require('sport-track-db').activity_dao;
var activity_entry_dao = require('sport-track-db').activity_entry_dao;

router.get('/', function (req, res, next) {
  if (!req.session.email) {
    res.redirect('/connect');
    return;
  }

  res.render('upload');
});

router.post('/', function (req, res, next) {
  if (!req.session.email) {
    res.redirect('/connect');
    return;
  }

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.render('upload', { error: "Erreur lors du téléchargement du fichier." });
      return;
    }

    if (!files || !files.foo) {
      res.render('upload', { error: "Aucun fichier téléchargé." });
      return;
    }

    const fichierContent = fs.readFileSync(files.foo.filepath, 'utf-8');

    if (fichierContent) {
      const tableau = JSON.parse(fichierContent);

      if (tableau) {
        const distanceTotale = calculDistanceTrajet(tableau.data);
        const hr = calculateHeartRateAll(tableau.data);

        const heureDebut = tableau.data[0].time;
        const heureFin = tableau.data[tableau.data.length - 1].time;

        const dureeFormatee = calculDuree(heureDebut, heureFin);

        const activity = {
          name: fields.filename,
          date: tableau.activity.date,
          startTime: heureDebut,
          duration: dureeFormatee,
          distance: distanceTotale,
          minHeartRate: hr[0],
          maxHeartRate: hr[1],
          avgHeartRate: hr[2],
          email: req.session.email
        };

        activity_dao.insert(activity)
          .then((activityId) => {
            for (let i = 0; i < tableau.data.length; i++) {
              const entry = tableau.data[i];
              const activityEntry = {
                time: entry.time,
                heartRate: entry.cardio_frequency,
                latitude: entry.latitude,
                longitude: entry.longitude,
                altitude: entry.altitude,
                idAct: activityId // Utilisation de l'ID de l'activité insérée
              };

              activity_entry_dao.insert(activityEntry);
            }
            res.redirect('/activity_list');
          })
          .catch((err) => {
            res.render('upload', { error: err.message });
          });
      } else {
        res.render('upload', { error: "Erreur du décodage du contenu JSON." });
      }
    } else {
      res.render('upload', { error: "Erreur lors de la lecture du fichier." });
    }
  });
});

module.exports = router;
