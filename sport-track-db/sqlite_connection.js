const sqlite3 = require('sqlite3').verbose(); // Verbose for more detailed stack traces
const DB_FILE = './sport_track.db';

class SqliteConnection {
  constructor() {
    this.db = new sqlite3.Database(DB_FILE, (err) => {
      // Callback
      if (err) {
        console.error('Erreur lors de la connexion à la base de données SQLite:', err.message);
      } else {
        console.log('Connexion à la base de données SQLite établie.');
      }
    });
  }

  /**
   * Obtient la connexion à la base de données SQLite.
   * @returns {sqlite3.Database} La connexion à la base de données SQLite.
   */
  getConnection() {
    return this.db;
  }
}

// Crée une instance unique de SqliteConnection et l'exporte
export default new SqliteConnection().getConnection();
