const userDao = require('./user_dao');

// Test the connexion to the database
var db = require('./sport-track-db').db_connection;

const userValues = {
    email: 'simon.lechanu@example.com',
    password: 'motdepasse',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'M',
    height: 180,
    weight: 75,
};

const userUpdateValues = {
    email: 'simon.lechanu@example.com',
    password: 'je change de mot de passe',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'M',
    height: 180,
    weight: 75,
};

const invalidUserValues = {
    email: 'simon.lechanu@example.com',
    password: 'motdepasse',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'M',
    height: -200, // Invalid height
    weight: 75,
};

userDao.insert(userValues, (err) => { // Callback
    console.log('[+] Test de l\'ajout d\'un utilisateur');
    if (err) {
        console.error('[!] Erreur lors de l\'ajout de l\'utilisateur:', err);
    } else {
        console.log(`[-] Utilisateur ajouté avec succès`);
        updateUser();
    }
});

userDao.insert(invalidUserValues, (err, userId) => { // Callback
    console.log('[+] Test de l\'ajout d\'un utilisateur invalide');
    if (err) {
        console.log(`[-] Erreur volontairement provoquée lors de l'ajout de l'utilisateur: ${err}`);
    } else {
        console.error(`[!] Erreur: l'utilisateur n'aurait pas dû être ajouté`);
    }
});

function updateUser() {
    userDao.update(userUpdateValues, (err) => { // Callback
        console.log('[+] Test de la mise à jour d\'un utilisateur');
        if (err) {
            console.error('[!] Erreur lors de la mise à jour de l\'utilisateur:', err);
        } else {
            console.log(`[-] Utilisateur mis à jour avec succès`);
            searchUser();
        }
    });
} 

function searchUser() {
    userDao.findByKey('simon.lechanu@example.com', (err, user) => { // Callback
        console.log('[+] Test de la recherche d\'un utilisateur');
        if (err) {
            console.error('[!] Erreur lors de la recherche de l\'utilisateur:', err);
        } else {
            console.log(`[-] Utilisateur trouvé avec succès: ${user.email}`);
        }
    });
}
