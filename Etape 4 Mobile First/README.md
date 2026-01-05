# 📱 To-Do List — JavaScript Vanilla (Mobile First)

Application de gestion de tâches **Mobile First**, développée en **JavaScript Vanilla**, avec persistance des données via **localStorage**.  
L’interface est pensée pour un **usage mobile**, avec affichage des tâches sous forme de **cartes visuelles**, colorées selon la priorité.

---

## Sommaire

- Présentation
- Fonctionnalités
- Architecture du projet
- Détails techniques
  - Modélisation des données
  - Persistance des données
  - Ajout d’une tâche
  - Validation du formulaire
  - Affichage des tâches
  - Gestion des statuts
  - Tri des tâches
  - Modification d’une tâche
  - Gestion des dates (Moment.js)
  - UI / UX & CSS
- Limites identifiées
- Technologies utilisées
- Licence

---

## Présentation

Ce projet a pour objectif de consolider les **fondamentaux JavaScript front-end**, dans un contexte **mobile** :

- manipulation du DOM
- gestion de formulaires
- structuration des données
- persistance locale sans backend
- logique métier claire et commentée

L’application permet à l’utilisateur de **créer, consulter, modifier, trier et supprimer des tâches**, avec une **lecture visuelle immédiate** grâce aux couleurs de priorité.

---

## Fonctionnalités

### Gestion des tâches

- Ajout d’une tâche via formulaire
- Affichage des tâches sous forme de **cartes**
- Couleur et dégradé liés à la priorité
- Modification d’une tâche existante
- Suppression automatique via changement de statut

### Priorisation & organisation

- Priorités multiples (Très urgent → Optionnelle)
- Étiquettes (Personnel / Professionnel)
- Statuts dynamiques :
  - À faire
  - En cours
  - Terminée
  - Supprimée

### Tri

- Par priorité
- Par date de création
- Par date d’échéance
- Par statut

---

## Architecture du projet

Projet volontairement **simple et autonome**, sans framework.

To-Do-List-Mobile/

├── index.html (structure HTML, styles intégrés, logique JavaScript)

└── README.md (documentation du projet)

> Le JavaScript et le CSS sont intégrés directement dans le fichier HTML afin de faciliter la lecture et la compréhension pédagogique.

## Détails techniques

### 1) Modélisation des données

Le projet utilise des tableaux d’objets “référentiels” (catalogues) directement dans le script :

- `priorite[]` : id / label / description / couleur
- `etiquette[]` : id / label / description
- `statut[]` : id / label / description

Ces référentiels servent à :

- remplir les listes déroulantes (`<select>`) de **priorité** et **étiquette**
- afficher les **labels** au lieu des IDs
- associer une **couleur** à chaque priorité pour le rendu visuel des cartes

#### Structure d’une tâche

Chaque tâche est stockée sous forme d’objet :

- `idTache` : number
- `titre` : string
- `description` : string
- `idPriorite` : string (valeur issue du `<select>`)
- `idEtiquette` : string (valeur issue du `<select>`)
- `idStatut` : number (1 par défaut à la création)
- `dateCreation` : string (`YYYY-MM-DD`)
- `dateEcheance` : string (`YYYY-MM-DD`)

> Remarque : `idPriorite` et `idEtiquette` proviennent des `<select>` et sont donc des **chaînes**.  
> Les comparaisons et recherches se font avec `==` dans le code (coercition contrôlée), ce qui fonctionne dans ce contexte.

---

### 2) Persistance des données (localStorage)

Clé utilisée :

- `dataTache` : tableau complet des tâches (JSON)

Pourquoi `JSON.stringify()` / `JSON.parse()` ?

- `localStorage` stocke uniquement des **chaînes de caractères**
- on sérialise le tableau en JSON à l’écriture
- on désérialise en tableau JavaScript à la lecture

Cycle standard :

1. lecture : `localStorage.getItem("dataTache")`
2. conversion : `JSON.parse(...)`
3. modification : ajout / édition / suppression / tri
4. sauvegarde : `localStorage.setItem("dataTache", JSON.stringify(taches))`

---

### 3) Ajout d’une tâche (formulaire)

Au clic sur **Ajouter** :

1. récupération (ou initialisation) du tableau `tache[]` depuis `dataTache`
2. lecture des champs du formulaire (titre, description, priorité, étiquette, dates)
3. validation des champs obligatoires
4. validation des dates (échéance >= création)
5. création d’un nouvel objet tâche :
   - `idTache = tache.length + 1`
   - `idStatut = 1` (statut “A faire” par défaut)
6. ajout dans le tableau + sauvegarde dans `localStorage`
7. reset du formulaire + rafraîchissement de l’affichage (`afficherTaches()`)

---

### 4) Validation du formulaire

#### Champs obligatoires

La validation est basée sur une liste de champs :

- détection des champs vides
- bordure rouge sur les champs invalides
- message d’alerte listant les champs manquants

#### Validation des dates

La date d’échéance ne peut pas être antérieure à la date de création :

- conversion des valeurs en objets `Date`
- mise à zéro des heures (`setHours(0,0,0,0)`) pour comparer uniquement les jours
- si `dateEcheance < dateCreation` :
  - bordure rouge sur le champ échéance
  - erreur gérée via `try/catch` + `alert(...)`

### 5) Affichage des tâches

Les tâches sont affichées sous forme de **cartes dynamiques** :

- création d’un `<div>` par tâche
- bordure colorée selon la priorité
- dégradé léger pour améliorer la lisibilité
- informations clairement structurées

Chaque carte contient :

- titre
- description
- priorité
- étiquette
- dates
- `<select>` de statut
- bouton **Modifier**

---

### 6) Gestion du statut & suppression

Chaque tâche dispose d’un `<select>` de statut.

Au changement :

- mise à jour du statut dans les données
- si le statut est **“Supprimée”** :
  - suppression définitive de la tâche
- sauvegarde dans le `localStorage`
- réaffichage automatique

---

### 7) Tri des tâches

Le tri est piloté par un `<select>` dédié :

- priorité (ordre numérique)
- date de création
- date d’échéance
- statut

Le tri utilise `.sort()` avec :

- comparaisons numériques
- comparaisons de dates (`Date()`)

---

### 8) Modification d’une tâche

Workflow :

1. clic sur **Modifier**
2. pré-remplissage du formulaire
3. défilement automatique vers le formulaire
4. bouton **Ajouter** remplacé par **Sauvegarder**
5. validation et sauvegarde
6. mise à jour dans le `localStorage`
7. retour à l’affichage normal

Aucune duplication de tâche n’est créée.

---

### 9) Gestion des dates avec Moment.js

Moment.js est utilisé pour :

- formater les dates affichées (`DD/MM/YYYY`)
- définir une date minimale (date du jour)
- garantir la cohérence entre affichage et stockage

---

### 10) UI / UX & CSS (Mobile First)

- largeur limitée pour le confort mobile
- layout centré verticalement
- formulaires en colonne
- boutons contrastés et accessibles
- animations légères (`hover`, `scale`)
- lecture rapide grâce aux couleurs de priorité

---

## Limites identifiées

- génération simple des IDs (`length + 1`)
- dépendance au navigateur (localStorage)
- application mono-utilisateur
- pas de synchronisation multi-appareils

Ces limites sont volontaires dans un cadre pédagogique.

---

## Technologies utilisées

- HTML5
- CSS3 (Mobile First)
- JavaScript ES6
- LocalStorage API
- Moment.js

---

## Licence

Projet pédagogique réalisé dans un cadre de formation.  
Libre d’utilisation à des fins d’apprentissage et de démonstration.

---

© 2025 — **David POTEL** — Groupe 1
