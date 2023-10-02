const sqlite3 = require('sqlite3').verbose();
const DB_FILE = './sport_track.db'; // Assurez-vous que le chemin correspond à votre fichier de base de données

// Crée une instance de la base de données SQLite
const db = new sqlite3.Database(DB_FILE);

// Lecture du fichier create_db.sql et exécution des commandes SQL pour réinitialiser la base de données
const fs = require('fs');
const sql = fs.readFileSync('create_db.sql', 'utf8');

db.serialize(() => {
  db.exec(sql, (err) => {
    if (err) {
      console.error('Erreur lors de la réinitialisation de la base de données SQLite:', err.message);
    } else {
      console.log('La base de données a été réinitialisée avec succès.');
    }

    // Fermeture de la connexion à la base de données
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la connexion à la base de données SQLite:', err.message);
      }
    });
  });
});
