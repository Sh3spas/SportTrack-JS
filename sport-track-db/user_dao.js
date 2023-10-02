const db = require('./sqlite_connection');

var UserDAO = function () {
    
  this.insert = function (values, callback) {
    const { email, password, firstName, lastName, dateOfBirth, gender, height, weight } = values;
    const query = `
      INSERT INTO User (email, password, firstName, lastName, dateOfBirth, gender, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [email, password, firstName, lastName, dateOfBirth, gender, height, weight];

    db.run(query, params, function (err) {
      if (err) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', err.message);
        callback(err);
      } else {
        console.log(`Utilisateur inséré avec succès, ID: ${this.lastID}`);
        callback(null, this.lastID);
      }
    });
  };

  this.update = function (key, values, callback) {
    const { email, password, firstName, lastName, dateOfBirth, gender, height, weight } = values;
    const query = `
      UPDATE User
      SET email = ?, password = ?, firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, height = ?, weight = ?
      WHERE email = ?
    `;
    const params = [email, password, firstName, lastName, dateOfBirth, gender, height, weight, key];

    db.run(query, params, function (err) {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', err.message);
        callback(err);
      } else {
        console.log(`Utilisateur mis à jour avec succès, lignes modifiées: ${this.changes}`);
        callback(null, this.changes);
      }
    });
  };

  this.delete = function (key, callback) {
    const query = 'DELETE FROM User WHERE email = ?';

    db.run(query, [key], function (err) {
      if (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err.message);
        callback(err);
      } else {
        console.log(`Utilisateur supprimé avec succès, lignes supprimées: ${this.changes}`);
        callback(null, this.changes);
      }
    });
  };

  this.findAll = function (callback) {
    const query = 'SELECT * FROM User ORDER BY firstName, lastName';

    db.all(query, [], function (err, rows) {
      if (err) {
        console.error('Erreur lors de la récupération de tous les utilisateurs:', err.message);
        callback(err, null);
      } else {
        console.log('Récupération de tous les utilisateurs avec succès.');
        callback(null, rows);
      }
    });
  };

  this.findByKey = function (key, callback) {
    const query = 'SELECT * FROM User WHERE email = ?';

    db.get(query, [key], function (err, row) {
      if (err) {
        console.error('Erreur lors de la recherche de l\'utilisateur par clé:', err.message);
        callback(err, null);
      } else {
        console.log('Recherche de l\'utilisateur par clé réussie.');
        callback(null, row);
      }
    });
  };
};

var dao = new UserDAO();
module.exports = dao;
