# To-Do List — JavaScript Vanilla (Backticks)

**Application de gestion de tâches en JavaScript pur (Vanilla JS)**  
Persistance via **localStorage** et génération dynamique de l’interface avec les **template literals (backticks)**.

Ce projet est volontairement **sans framework** afin de se concentrer sur les **fondamentaux front-end** :
DOM, logique métier, gestion d’état, validation de formulaire et affichage dynamique.

---

## Sommaire

- Présentation
- Objectifs pédagogiques
- Fonctionnalités
- Arborescence du projet
- Détails techniques
  - Modélisation des données
  - Persistance (localStorage)
  - Ajout et modification d’une tâche
  - Génération dynamique avec les backticks
  - Gestion des statuts et suppression
  - Tri des tâches
  - Gestion des dates (Moment.js)
  - CSS & UI
- Limites identifiées
- Technologies utilisées
- Conclusion
- Licence

---

## Présentation

Cette To-Do List est un **projet pédagogique** visant à reproduire le cycle de vie complet d’une tâche dans une application front-end :

- création
- affichage
- modification
- suppression
- persistance

La particularité de cette version repose sur l’utilisation des **template literals (`)** pour générer dynamiquement l’interface HTML, plutôt que sur une construction DOM élément par élément.

---

## Objectifs pédagogiques

Ce projet permet de démontrer :

- la **structuration des données** en JavaScript
- la **manipulation du DOM sans librairie**
- la **persistance locale** via localStorage
- l’utilisation concrète des **template literals**
- la gestion d’un **flux multi-pages sans backend**
- l’identification des **limites d’une application front-only**

---

## Fonctionnalités

### Page 1 — Ajout / Modification (`index.html`)

- Formulaire unique pour l’ajout et la modification
- Champs obligatoires avec validation visuelle
- Contrôle des dates (échéance ≥ date de création)
- Création d’un objet tâche structuré
- Enregistrement dans `localStorage`
- Mode modification :
  - pré-remplissage du formulaire
  - changement du bouton (“Ajouter” → “Sauvegarder”)
  - mise à jour de la tâche existante

---

### Page 2 — Liste des tâches (`page2.html`)

- Affichage dynamique des tâches
- Génération HTML via **template literals**
- Modification du statut en temps réel
- Suppression logique des tâches
- Tri par différents critères
- Accès à la modification d’une tâche

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

## Détails techniques

### 1) Modélisation des données

L’application repose sur une **modélisation simple mais structurée**, inspirée des bases de données relationnelles.

#### Données de référence

Les **priorités**, **étiquettes** et **statuts** sont définis sous forme de tableaux d’objets JavaScript.  
Ces tableaux jouent le rôle de **tables de référence**.

Ils permettent de :

- alimenter dynamiquement les champs `<select>`
- associer des libellés lisibles aux identifiants
- centraliser la logique métier
- faciliter l’évolution de l’application

---

#### Structure d’une tâche

Chaque tâche est représentée par un **objet JavaScript** contenant :

- `idTache` : identifiant unique de la tâche
- `titre` : titre de la tâche
- `description` : description détaillée
- `idPriorite` : référence vers une priorité
- `idEtiquette` : référence vers une étiquette
- `idStatut` : statut courant de la tâche
- `dateCreation` : date de création (format ISO)
- `dateEcheance` : date d’échéance (format ISO)

Les valeurs provenant des champs `<select>` sont des **chaînes de caractères**.  
Elles sont converties en nombres (`parseInt`) lors des comparaisons, tris et traitements logiques.

---

#### Rôle de cette modélisation

Cette structure permet :

- une séparation claire entre **données** et **interface**
- une manipulation cohérente des tâches
- une évolution naturelle vers :
  - une API REST
  - une base de données
  - un framework front (React, Vue)

---

### 2) Persistance via LocalStorage

Les données sont stockées côté navigateur grâce à **localStorage**.

Clés utilisées :

- `dataTache` : tableau principal des tâches
- `tacheTemporaire` : tâche en cours de modification

Les objets sont :

- sérialisés avec `JSON.stringify()`
- désérialisés avec `JSON.parse()`

---

### 3) Ajout et modification d’une tâche

#### Ajout

1. Validation des champs
2. Validation des dates
3. Création de l’objet tâche
4. Enregistrement dans `localStorage`

#### Modification

- la tâche est stockée temporairement
- le formulaire est pré-rempli
- le bouton change de comportement
- la tâche est mise à jour puis sauvegardée

Ce mécanisme permet de simuler un **workflow multi-pages sans backend**.

---

### 4) Génération dynamique avec les backticks

L’affichage des tâches repose sur les **template literals** :

- génération HTML lisible
- interpolation directe des données
- rendu rapide et compréhensible

Limite connue :  
L’utilisation de `innerHTML` n’est pas sécurisée dans un contexte réel, mais reste acceptable ici **dans un cadre pédagogique**.

---

### 5) Gestion du statut et suppression

Chaque tâche possède un statut modifiable :

- changement dynamique via `<select>`
- mise à jour des données dans `localStorage`
- si le statut devient **“Supprimée”** :
  - la tâche est retirée des données
  - l’affichage est reconstruit

---

### 6) Tri des tâches

Le tri est réalisé côté client avec `.sort()`.

Critères disponibles :

- priorité
- date de création
- date d’échéance
- statut

Après chaque tri :

- les données sont réenregistrées
- l’affichage est reconstruit

---

### 7) Gestion des dates (Moment.js)

Moment.js est utilisé pour :

- formater les dates affichées
- garantir la compatibilité avec les champs `input[type="date"]`

Ce choix est **pédagogique**.  
Des alternatives modernes existent (date-fns, Luxon, Intl).

---

### 8) CSS & UI

- Page formulaire :
  - layout simple et centré
  - mobile-first
  - hiérarchie visuelle claire

- Page liste :
  - mise en page responsive
  - lisibilité renforcée
  - différenciation visuelle des priorités

---

## Limites identifiées

- génération des identifiants perfectible
- dépendance au navigateur (localStorage)
- absence de backend
- couplage partiel logique / DOM

Ces limites sont **volontaires** dans un contexte d’apprentissage.

---

## Technologies utilisées

- HTML5
- CSS3 (Flexbox / Grid)
- JavaScript ES6
- LocalStorage API
- Moment.js

---

## Conclusion

Ce projet met en pratique  **des fondamentaux JavaScript** :

- logique métier
- manipulation du DOM
- persistance locale
- génération dynamique de l’interface

Il constitue une **base saine** pour une évolution vers des architectures plus professionnelles (backend, API, framework).

---

## Licence

Projet pédagogique / démonstration.  
Utilisation libre à des fins d’apprentissage.

---

© 2025 — David POTEL
Projet pédagogique — Groupe 1
