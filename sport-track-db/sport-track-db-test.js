const userDao = require('./user_dao');
const activityDao = require('./activity_dao');

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
            console.log('[-] Utilisateur trouvé avec succès:', user);
            deleteUser();
        }
    });
}

function deleteUser() {
    userDao.delete('simon.lechanu@example.com', (err) => { // Callback
        console.log('[+] Test de la suppression d\'un utilisateur');
        if (err) {
            console.error('[!] Erreur lors de la suppression de l\'utilisateur:', err);
        } else {
            console.log(`[-] Utilisateur supprimé avec succès`);
            launchTestActivityDAO();
        }
    });
};

// For testing the activity DAO, we use another method: promises
async function testActivityDAO() {
    try {
        console.log('[+] Test de l\'ajout d\'une activité')
        const activityId = await activityDao.insert({
            name: 'Course à pied',
            date: '2023-09-28',
            startTime: '08:00:00',
            duration: 3600,
            distance: 5000,
            minHeartRate: 60,
            maxHeartRate: 160,
            avgHeartRate: 120,
            email: 'simon.lechanu@example.com',
        });
        console.log(`[-] Activité insérée avec succès, ID: ${activityId}`);

        console.log('[+] Test de la mise à jour d\'une activité')
        await activityDao.update({
            id: activityId,
            name: 'Nouvelle course à pied',
            date: '2023-09-29', // Date Changed
            startTime: '09:00:00',
            duration: 4200,
            distance: 6000,
            minHeartRate: 65,
            maxHeartRate: 170,
            avgHeartRate: 130,
            email: 'simon.lechanu@example.com',
        });
        console.log(`[-] Activité mise à jour avec succès, ID: ${activityId}`);

        console.log('[+] Test de recherche d\'une activité par ID');
        const foundActivity = await activityDao.findById(activityId);
        console.log('Activité trouvée par ID:', foundActivity);

        console.log('[+] Test de recherche d\'une activité par e-mail de l\'utilisateur');
        const userActivities = await activityDao.findByUser('simon.lechanu@example.com');
        console.log('[-] Activités trouvées par e-mail de l\'utilisateur:', userActivities);

        console.log('[+] Test de suppression d\'une activité');
        await activityDao.delete(activityId);
        console.log('[-] Activité supprimée avec succès, ID:', activityId);
    } catch (error) {
        console.error('[!] Erreur lors des tests:', error);
    }
}

function launchTestActivityDAO() {
    // Test the activity DAO with an user
    userDao.insert(userValues, (err) => { // Callback
        console.log('[+] Test de l\'ajout d\'un utilisateur');
        testActivityDAO();
    });
};