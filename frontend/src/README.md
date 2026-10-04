# Projet 1 - Archives des Jeux Olympiques (124 ans)

## Prérequis
- Node.js
- XAMPP (Apache & MySQL)
- Python (avec pandas et mysql-connector-python) pour l'importation de la base de données.

## Installation et Configuration
1. Démarrer Apache et MySQL via le panneau de contrôle XAMPP.
2. Créer une base de données nommée `olympics_db` dans phpMyAdmin.
3. Lancer le script Python `import_data.py` pour générer les tables et importer les données CSV.

## Démarrer le Backend
1. Ouvrir un terminal dans le dossier `backend`.
2. Installer les dépendances : `npm install`
3. Lancer le serveur : `nodemon index.js` (le serveur tournera sur le port 5000).

## Démarrer le Frontend
1. Ouvrir un second terminal dans le dossier `frontend`.
2. Installer les dépendances : `npm install`
3. Lancer l'application React : `npm run dev`