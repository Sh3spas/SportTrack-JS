const db = require('./sqlite_connection');

var ActivityEntryDAO = function () {

    this.findById = function(id){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM ActivityEntry WHERE idAData = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.findByActivity = function(activityId){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM ActivityEntry WHERE idAct = ?', [activityId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.insert = function(entry){
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO ActivityEntry (time, heartRate, latitude, longitude, altitude, idAct) VALUES (?, ?, ?, ?, ?, ?)'
            ,[entry.time, entry.heartRate, entry.latitude, entry.longitude, entry.altitude, entry.idAct]
            ,function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    this.update = function(entry){
        return new Promise((resolve, reject) => {
            this.findById(entry.idAData).then((rows) => {
                if(rows.length > 0){
                    db.run('UPDATE ActivityEntry SET time = ?, heartRate = ?, latitude = ?, longitude = ?, altitude = ?, idAct = ? WHERE idAData = ?'
                    ,[entry.time, entry.heartRate, entry.latitude, entry.longitude, entry.altitude, entry.idAct, entry.idAData]
                    ,function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this.lastID);
                        }
                    });
                } else {
                    reject("ActivityEntry not found");
                }
                
            });
        });
    }

    this.delete = function(id){
        return new Promise((resolve, reject) => {
            this.findById(id).then((rows) => {
                if(rows.length > 0){
                    db.run('DELETE FROM ActivityEntry WHERE idAData = ?', [id], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    reject("ActivityEntry not found");
                }
            });
        });
    }
}

module.exports = new ActivityEntryDAO();
