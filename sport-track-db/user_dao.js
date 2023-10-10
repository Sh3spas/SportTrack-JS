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
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  this.update = function (values, callback) {
    const { email, password, firstName, lastName, dateOfBirth, gender, height, weight } = values;

    const query = `
      UPDATE User
      SET password = ?, firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, height = ?, weight = ?
      WHERE email = ?
    `;
    
    const params = [password, firstName, lastName, dateOfBirth, gender, height, weight, email];

    db.run(query, params, function (err) {
      if (err) {
        callback(err);
      }  else if (this.changes === 0) {
        callback(new Error("Aucun utilisateur n'a été modifié."));
      } else {
        callback(null);
      }
    });
  };

  this.delete = function (key, callback) {
    const query = 'DELETE FROM User WHERE email = ?';

    db.run(query, [key], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, this.changes);
      }
    });
  };

  this.findAll = function (callback) {
    const query = 'SELECT * FROM User ORDER BY firstName, lastName';

    db.all(query, [], function (err, rows) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  };

  this.findByKey = function (key, callback) {
    const query = 'SELECT * FROM User WHERE email = ?';

    db.get(query, [key], function (err, row) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  };
};

module.exports = new UserDAO();
