require ('./sqlite_connection.js')
const userDao = require('./user_dao');

// Méthode de test
// Les valeurs de l'utilisateur à ajouter
const userValues = {
    email: 'example@example.com',
    password: 'motdepasse',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'M',
    height: 180,
    weight: 75,
};

// Appelez la méthode d'insertion pour ajouter l'utilisateur
userDao.insert(userValues, (err, userId) => {
if (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
} else {
    console.log(`Utilisateur ajouté avec succès, ID: ${userId}`);
}
});

