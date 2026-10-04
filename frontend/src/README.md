# **Projet 1 : Archives des Jeux Olympiques (SED 2515)**

## ** Description du Projet**
Cette application web est une plateforme "full-stack" qui affiche une liste d'athlètes des Jeux Olympiques. Elle inclut une base de données MySQL, une API backend créée avec Node.js et Express, et une interface utilisateur frontend développée avec React et stylisée avec Bulma CSS.

## **Fonctionnalités Développées**
*   **Interface Frontend (React) :** Création et intégration du composant AthleteList.js pour afficher les données.
*   **Titre Interactif :** Ajout d'un titre dynamique (<h1>) qui permet de recharger la page d'accueil d'un simple clic.
*   **Style Personnalisé (CSS) :** Ajout du fichier App.css avec des styles 100% personnalisés incluant une couleur de fond, des ombres dynamiques sur la barre de recherche (:focus) et un effet de survol sur les lignes du tableau (:hover).
*   **Défilement Infini & Recherche :** Implémentation du chargement continu des données grâce à react-infinite-scroll-component et d'une barre de recherche textuelle.
*   **Francisation du Code :** Modification de la langue de l'application dans index.html (lang="fr") et mise à jour de la balise <title>.
*   **Tests :** Le fichier de test App.test.js a été généré et intégré au dépôt.
*   **Suivi de Version :** Utilisation intensive de Git (CLI) pour valider (commit) et pousser (push) les modifications, incluant la résolution de conflits de fusion.

## **Prérequis Techniques**
*   **Node.js**
*   **XAMPP** (Apache et MySQL)
*   **Navigateur Web**

## ** Instructions de Mise en Marche**

### **Étape 1 : Base de données (MySQL)**
1.  Ouvrez **XAMPP** et démarrez **Apache** et **MySQL**.
2.  Allez sur http://localhost/phpmyadmin/.
3.  Allez dans l'onglet **SQL**, tapez `CREATE DATABASE olympic_db;` et exécutez.
4.  Sélectionnez la base de données `olympic_db`, allez dans **Insérer** et ajoutez quelques athlètes factices pour tester l'affichage.

### **Étape 2 : Backend (API Node.js)**
1.  Ouvrez un terminal et naviguez dans le dossier `backend`.
2.  Installez les dépendances : `npm install`
3.  Démarrez le serveur : `nodemon index`
*(Le terminal devrait indiquer que le serveur fonctionne sur le port 5000).*

### **Étape 3 : Frontend (Application React)**
1.  Ouvrez un **nouveau terminal** (laissez le backend tourner) et naviguez dans le dossier `frontend`.
2.  Installez les dépendances : `npm install`
3.  Lancez l'application : `npm start`
4.  Le navigateur s'ouvrira sur http://localhost:3000.