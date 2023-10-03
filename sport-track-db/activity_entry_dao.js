const db = require('./sqlite_connection');

var ActivityEntryDAO = function () {

  this.findByUser = function(user_email) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM Activity WHERE email = ?', [user_email], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  this.findById = function(id) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM Activity WHERE idAct = ?', [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  this.insert = function(activity) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO Activity (name, date, startTime, duration, distance, minHeartRate, maxHeartRate, avgHeartRate, email) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ?)',
        [activity.name, activity.date, activity.startTime, activity.duration, activity.distance, activity.minHeartRate, activity.maxHeartRate, activity.avgHeartRate, activity.email],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
    });
  }

  this.update = function(activity) {
    return new Promise((resolve, reject) => {
      this.findById(activity.idAct).then((rows) => {
        if (rows.length > 0) {
          db.run('UPDATE Activity SET name = ?, date = ?, startTime = ?, duration = ?, distance = ?, minHeartRate = ?, maxHeartRate = ?, avgHeartRate = ?, email = ? WHERE idAct = ?',
            [activity.name, activity.date, activity.startTime, activity.duration, activity.distance, activity.minHeartRate, activity.maxHeartRate, activity.avgHeartRate, activity.email, activity.idAct],
            function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.lastID);
              }
            });
        } else {
          reject("Activity not found");
        }

      });
    });
  }

  this.delete = function(id) {
    return new Promise((resolve, reject) => {
      this.findById(id).then((rows) => {
        if (rows.length > 0) {
          db.run('DELETE FROM Activity WHERE idAct = ?', [id], (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          reject("Activity not found");
        }
      });
    });
  }
  
}

module.exports = new ActivityEntryDAO();
