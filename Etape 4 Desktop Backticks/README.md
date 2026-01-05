# To-Do List — JavaScript Vanilla

LocalStorage · DOM · Template Literals (Backticks)

Projet de To-Do List développé en JavaScript pur (Vanilla JS), sans framework.
L’objectif est de démontrer la maîtrise des fondamentaux front-end :
manipulation du DOM, gestion d’état, persistance locale, validation de formulaire
et génération dynamique de l’interface utilisateur.

---

## Objectifs pédagogiques

Ce projet permet de démontrer :

- la structuration de données en JavaScript
- l’utilisation du DOM sans librairie
- la persistance via localStorage
- l’utilisation des template literals (backticks)
- la gestion d’un cycle de vie complet d’une tâche
- l’identification des limites d’une application front-only

---

## Structure du projet

to-do-list  
├── index.html        (ajout / modification des tâches)  
├── page2.html        (liste et gestion des tâches)  
├── script.js         (logique métier page 1)  
├── script2.js        (affichage, tri, statut page 2)  
├── style.css         (styles page formulaire)  
└── style2.css        (styles page liste)

---

## Description des fichiers

### index.html

Page dédiée à l’ajout et à la modification d’une tâche.
Le même formulaire est utilisé pour les deux actions afin d’éviter
la duplication de logique.

Fonctionnalités :

- formulaire HTML complet
- champs obligatoires
- chargement de script.js
- intégration de Moment.js pour la gestion des dates

---

### page2.html

Page dédiée à l’affichage des tâches.

Fonctionnalités :

- affichage dynamique des tâches
- tri des tâches
- modification du statut
- accès à la modification d’une tâche

---

## Modélisation des données

### Données de référence

Les priorités, étiquettes et statuts sont modélisés sous forme de tableaux
JavaScript. Ces tableaux jouent le rôle de tables de référence, similaires
à une base de données relationnelle.

---

### Structure d’une tâche

Une tâche est représentée par un objet JavaScript contenant :

- un identifiant
- un titre
- une description
- une priorité
- une étiquette
- un statut
- une date de création
- une date d’échéance

Les valeurs provenant des champs select sont des chaînes de caractères,
ce qui nécessite une conversion lors des comparaisons et tris.

---

## Persistance des données

Les données sont stockées dans le navigateur à l’aide de localStorage.

Clés utilisées :

- dataTache : tableau principal des tâches
- tacheTemporaire : tâche en cours de modification

Les données sont converties en JSON lors du stockage et reconverties
en objets JavaScript lors de la lecture.

---

## Ajout et modification d’une tâche

Lorsqu’une tâche est ajoutée :

1. les champs sont validés
2. les dates sont contrôlées
3. l’objet tâche est créé
4. les données sont enregistrées dans localStorage

Lorsqu’une tâche est modifiée :

- elle est stockée temporairement dans localStorage
- le formulaire est pré-rempli
- le bouton change de comportement
- la tâche est mise à jour puis réenregistrée

Ce mécanisme simule un flux multi-pages sans backend.

---

## Génération dynamique de l’interface

Les tâches sont affichées dynamiquement à l’aide des template literals
(backticks). Cette approche permet :

- une écriture HTML lisible
- une interpolation directe des données
- une compréhension claire du rendu dynamique

Limite connue :
l’utilisation de innerHTML peut poser des problèmes de sécurité dans
un contexte réel, mais reste acceptable ici dans un cadre pédagogique.

---

## Gestion du statut et du tri

Chaque tâche possède un statut modifiable dynamiquement.
Si le statut devient « Supprimée », la tâche est retirée du tableau.

Le tri des tâches peut se faire par :

- priorité
- date de création
- date d’échéance
- statut

Après chaque tri, les données sont réenregistrées afin de conserver
une cohérence entre affichage et stockage.

---

## Gestion des dates

Moment.js est utilisé pour :

- formater les dates pour l’affichage
- garantir la compatibilité avec les champs date HTML

Ce choix est pédagogique.
Des alternatives modernes existent (date-fns, Luxon, Intl).

---

## Styles et interface

La page formulaire est conçue en mobile-first avec un layout simple
et centré.

La page liste utilise une grille CSS responsive permettant un affichage
adapté à toutes les tailles d’écran.

Les couleurs des cartes reflètent la priorité des tâches afin de renforcer
la lisibilité visuelle.

---

## Limites identifiées

- génération des identifiants perfectible
- dépendance au navigateur (localStorage)
- absence de backend
- logique et DOM partiellement couplés

Ces limites sont volontaires dans un cadre d’apprentissage.

---

## Technologies utilisées

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript ES6
- LocalStorage API
- Moment.js

---

## Conclusion

Ce projet démontre une compréhension solide des fondamentaux JavaScript :
logique métier, DOM, persistance et structuration des données.

Il constitue une base saine pour une évolution vers des architectures
plus complexes et professionnelles.

---

© 2025 — David POTEL  
Projet pédagogique — Groupe 1
