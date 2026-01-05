# To-Do List — JavaScript Vanilla (TOM)

**TOM = Table-Oriented Model**  
Application de gestion de tâches en **JavaScript pur (Vanilla JS)** avec persistance via **localStorage**.  
Spécificité de cette version : affichage des tâches **sous forme de tableau HTML** (`table / thead / tbody / tr / th / td`) au lieu de cartes.

---

## Sommaire

- Présentation
- Fonctionnalités
- Arborescence du projet
- Détails techniques
  - Modélisation des données
  - Persistance (localStorage)
  - Validation du formulaire (page 1)
  - Affichage TOM (tableau) (page 2)
  - Gestion du statut + suppression
  - Tri
  - Workflow de modification (page2 → page1)
  - Gestion des dates (Moment.js)
  - CSS & UI
- Limites identifiées
- Technologies
- Licence

---

## Présentation

Projet pédagogique orienté **fondamentaux front-end** :

- structuration des données en JavaScript
- manipulation du DOM
- stockage local (sans backend)
- gestion de formulaires et d’interactions

La version **TOM** met l’accent sur la construction dynamique d’un **tableau HTML**, proche des interfaces “métier” (gestion, suivi).

---

## Fonctionnalités

### Page 1 — Ajout / Modification (`index.html`)

- Ajout d’une tâche via formulaire
- Validation des champs obligatoires (bordures rouges + message)
- Validation des dates (échéance >= création)
- Statut par défaut : **“A faire”** (`idStatut = 1`)
- Enregistrement dans `localStorage` (`dataTache`)
- Mode modification :
  - pré-remplissage depuis `tacheTemporaire`
  - bouton “Ajouter” remplacé par “Sauvegarder les modifications”
  - redirection vers la liste après sauvegarde

### Page 2 — Liste (TOM) (`page2.html`)

- Affichage des tâches **en tableau**
- Chaque ligne = 1 tâche
- Bandeau visuel lié à la priorité (dégradé + bordure)
- Statut modifiable via `<select>`
- Suppression logique :
  - si statut “Supprimée” → suppression de la tâche des données
- Tri par :
  - priorité
  - date de création
  - date d’échéance
  - statut
- Bouton “Modifier” par tâche → retour page 1 en mode édition

---

## Arborescence du projet (fichiers fournis)

Projet To Do List Javascript/
├── index.html        (ajout / modification des tâches)  
├── page2.html        (liste et gestion des tâches)  
├── script.js         (logique métier page 1)  
├── script2.js        (affichage, tri, statut page 2)  
├── style.css         (styles page formulaire)  
└── style2.css        (styles page liste)

---

## Détails techniques

### 1) Modélisation des données

#### Référentiels (catalogues)

Le projet utilise des tableaux d’objets “référentiels” :

- `priorite[]` : id / label / description / couleur
- `etiquette[]` : id / label / description
- `statut[]` : id / label / description

Ces référentiels servent à :

- remplir les `<select>` (priorité / étiquette)
- afficher les labels au lieu des IDs
- associer une **couleur** à chaque priorité (UI)

#### Structure d’une tâche

Chaque tâche est stockée sous forme d’objet :

- `idTache` : number
- `titre` : string
- `description` : string
- `idPriorite` : string (vient d’un `<select>`)
- `idEtiquette` : string (vient d’un `<select>`)
- `idStatut` : number
- `dateCreation` : string (YYYY-MM-DD)
- `dateEcheance` : string (YYYY-MM-DD)

Particularité : les IDs provenant des `<select>` sont des chaînes → conversion avec `parseInt()` côté affichage/tri.

---

### 2) Persistance via LocalStorage

Clés utilisées :

- `dataTache` : tableau complet des tâches (JSON)
- `tacheTemporaire` : tâche envoyée à la page 1 pour édition (JSON)

Pourquoi `JSON.stringify()` / `JSON.parse()` ?

- `localStorage` ne stocke que des chaînes de caractères
- on sérialise / désérialise le tableau de tâches

---

### 3) Validation du formulaire (page 1)

#### Champs obligatoires

Validation via un tableau de champs (id + nom) :

- détection des champs vides
- bordure rouge
- message listant les champs manquants

#### Validation des dates

- conversion en objets `Date`
- mise à zéro des heures (`setHours(0,0,0,0)`)
- comparaison :
  - si `dateEcheance < dateCreation` → erreur + bordure rouge

---

### 4) Affichage TOM : génération dynamique du tableau (page 2)

Le tableau est construit entièrement en JavaScript :

1. création du `<table>`
2. création du `<thead>` + ligne d’en-tête
3. création du `<tbody>`
4. pour chaque tâche :
   - création d’une ligne (`insertRow`)
   - création des cellules (`insertCell`)
   - insertion des textes (titre, dates, labels…)
   - ajout d’un `<select>` de statut
   - ajout d’un bouton “Modifier”

UI :

- dégradé sur la ligne basé sur la couleur de priorité (`linear-gradient`)
- bordure gauche colorée sur la cellule titre

---

### 5) Gestion du statut + suppression

Chaque ligne contient un `<select>` :

- au changement (`change`) :
  - on récupère le nouveau statut
  - on met à jour `dataTache`
  - si statut = “Supprimée” (`idStatut === 4`) :
    - suppression de la tâche du tableau (`splice`)
  - mise à jour `localStorage`
  - rafraîchissement (`afficherTaches()`)

---

### 6) Tri

Le tri est piloté par `<select id="tri">` et `.sort()` :

- priorité : comparaison numérique via `parseInt()`
- dates : comparaison via `new Date(...)`
- statut : comparaison numérique

Après tri :

- sauvegarde dans `localStorage`
- reconstruction du tableau (rafraîchissement)

---

### 7) Workflow de modification (page2 → page1)

1. Clic sur “Modifier” (page 2)
2. Recherche de la tâche via `find()`
3. Stockage dans `localStorage` sous `tacheTemporaire`
4. Redirection vers `index.html`
5. Au chargement :
   - pré-remplissage du formulaire
   - bouton devient “Sauvegarder les modifications”
6. Sauvegarde → mise à jour → redirection vers `page2.html`

---

### 8) Gestion des dates (Moment.js)

Moment.js est utilisé pour :

- formater les dates affichées (DD/MM/YYYY)
- remplir correctement les champs `input[type=date]` en édition (YYYY-MM-DD)
- imposer des dates minimales (min = today) côté formulaire

---

### 9) CSS & UI

#### `style.css` (page 1)

- layout centré, mobile-first
- container étroit (`min(100%, 400px)`)
- formulaire en colonne
- boutons dégradés + hover

#### `style2.css` (page 2)

- container large (`min(80%, 1200px)`)
- tableau responsive (scroll horizontal si besoin)
- espacement entre cellules (`border-spacing`)
- survol des lignes
- bouton “Modifier” stylisé

---

## Limites identifiées

### Génération d’ID

- `idTache = tache.length + 1` peut créer des doublons après suppression.

### Robustesse si localStorage vide

- prévoir `JSON.parse(...) || []` pour éviter des erreurs si la clé n’existe pas.

### Application front-only

- pas de multi-utilisateur
- données liées au navigateur

---

## Technologies utilisées

- HTML5
- CSS3
- JavaScript ES6
- LocalStorage API
- Moment.js

---

## Licence

Projet pédagogique / démonstration.  
Utilisation libre à des fins d’apprentissage.

---

© 2025 — David POTEL — Groupe 1
