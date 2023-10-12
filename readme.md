# SportTrack - Application de suivi d'activités sportives

## Introduction
SportTrack est une application web qui permet aux utilisateurs de sauvegarder et gérer leurs données d'activités sportives en utilisant des montres "cardio/gps". L'application offre diverses fonctionnalités telles que la création de comptes utilisateur, la connexion/déconnexion, le chargement de fichiers d'activités sportives et la visualisation des activités enregistrées.

## Prérequis
- NPM
- Node.js
- SQLite3

## Installation

1. Clonez ce dépôt GitHub sur votre machine locale :
   ```
   git clone https://github.com/Sh3spas/SportTrack-JS.git
   ```

2. Installez les dépendances NPM :
    Dans le dossier express_webapp, faire la commande
    ```
    npm install
    ```

## Démarrage du Serveur

1. Démarrez le serveur Node.js intégré (assurez-vous d'être dans le répertoire racine du projet : express_webapp) :
   ```
   npm start
   ```

2. Accédez à l'application dans un navigateur en ouvrant `http://localhost:3000` dans la barre d'adresse.

## Tests Unitaires

Pour exécuter les tests unitaires, utiliser les commandes suivantes :

1. Pour tester la connexion à la base de données SQLite, se placer dans le package sport-track-db et faire la commande :
   ```
   npm run test
   ```

2. Pour tester le calcul de distances entre des points GPS, 3 fichiers fonctions, 3 commandes a taper a partir du dossier functions:
   ```
   node functions/functions.js
   node functions/objet.js
   node functions/objetbis.js
   ```

Si dans la console il apparait des lignes commençant par `[!]` alors les tests ont échoué. Si au contraire il apparait des lignes commençant par `[+]` ou `[-]` alors les tests ont réussi.

## Auteurs
Ce projet a été réalisé par [Baptiste GUERNY](https://github.com/BatLeDev) et [Simon Le CHANU](https://github.com/Sh3spas) dans le cadre de notre BUT Informatique à l'IUT de Vannes.

## Précision pour les ensiegnants
Choix fait : 
- Création d'une méthode suplémentaire degreesToRadians pour éviter de la répétition de code
- Dans le package sport-track-db:
-- Le userDAO utilise des Callbacks alors que les ActivityDAO et ActivityDAO utilisent des Promises