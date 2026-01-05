# Projet To-Do List – Front-End JavaScript

## Objectif du projet

Ce projet consiste à développer une **application web Front-End de gestion de tâches (To-Do List)** en utilisant uniquement :

- **HTML5** (structure et sémantique)
- **CSS3** (mise en page, design, responsive)
- **JavaScript** (logique applicative)
- **LocalStorage** (persistance des données côté navigateur)

L’objectif principal est de **comprendre les fondamentaux d’une application Front-End**, sans base de données ni back-end, tout en adoptant une **démarche structurée proche du fonctionnement d’une application réelle**.

---

## Principes pédagogiques

Ce projet a été conçu pour apprendre à :

- Manipuler des **données structurées au format JSON**
- Simuler des relations de type **base de données** (clé primaire / clé étrangère)
- Créer un **formulaire HTML statique puis dynamique**
- Stocker, lire et mettre à jour des données avec **LocalStorage**
- Construire une interface **Mobile First**
- Gérer le cycle de vie complet d’une donnée (création, affichage, modification, statut)

---

## Découpage du projet par étapes

Le projet est volontairement découpé en **plusieurs étapes progressives**, chacune ayant un objectif précis.

---

### 🔹 Étape 1 – Modélisation des données (JSON)

Objectif :  
Définir **la structure des données** avant d’écrire la moindre logique applicative.

- Création des objets **Tâche** au format JSON
- Création des paramètres (priorité, statut, etc.) sous forme de tableaux JSON
- Utilisation d’**identifiants numériques** pour simuler :
  - clés primaires
  - clés étrangères
- Préparation des données comme si elles provenaient d’une base de données

Cette étape permet de **séparer les données de l’interface**, une bonne pratique essentielle.

---

### 🔹 Étape 2 – Formulaire HTML & CSS (statique)

Objectif :  
Créer une **interface utilisateur propre et accessible**, sans JavaScript.

- Création du formulaire de saisie d’une tâche
- HTML sémantique (header, main, footer, form, label, input, select…)
- CSS sans framework (Flexbox / Grid autorisés)
- **Approche Mobile First**
- Les listes (priorité, etc.) sont codées “à la main”

Cette étape force à réfléchir à l’UX et au responsive **avant** la logique JS.

---

### 🔹 Étape 3 – Application Front-End JavaScript

Objectif :  
Rendre l’application **dynamique et fonctionnelle**.

- Génération dynamique du formulaire à partir des données JSON
- Lecture et écriture dans le **LocalStorage**
- Conversion JSON :
  - `JSON.stringify()` pour stocker
  - `JSON.parse()` pour relire
- Ajout automatique d’un identifiant pour chaque tâche
- Affichage des tâches dans un tableau récapitulatif

On passe d’un simple formulaire à une **véritable application Front-End**.

---

### 🔹 Étape 4 – Gestion des tâches (logique métier)

Objectif :  
Gérer le **cycle de vie complet d’une tâche**.

- Affichage du tableau des tâches
- Modification d’une tâche existante
- Marquage d’une tâche comme :
  - terminée
  - annulée
- Possibilité de trier ou filtrer les tâches
- Amélioration de l’ergonomie et du design

Cette étape est volontairement plus complexe :  
elle introduit une vraie **logique métier**, proche de ce que l’on retrouve en entreprise.

---

## Pourquoi une approche Mobile First ?

Le formulaire de saisie est conçu en **Mobile First** car :

- La saisie de tâches se fait souvent sur smartphone
- Cela force à prioriser l’essentiel
- Le responsive devient plus simple à gérer ensuite
- C’est une pratique standard dans le développement moderne

---

## Pourquoi LocalStorage ?

Le **LocalStorage** permet de :

- Simuler une persistance des données
- Comprendre les limites d’un stockage client
- Travailler avec du JSON comme dans une API
- Se concentrer sur le Front-End sans back-end

Les données restent disponibles même après la fermeture du navigateur.

---

## Pourquoi parler de “Backticks” (`) ?

Les **template literals** (backticks) sont utilisés en JavaScript pour :

- Générer du HTML dynamique plus lisible
- Insérer des variables facilement (`${variable}`)
- Construire des tableaux ou formulaires dynamiques
- Éviter les concaténations complexes avec `+`

Ils sont indispensables dès que l’on manipule du DOM dynamiquement.

---

## Évolution prévue

Ce projet Front-End est pensé comme une **base pédagogique**.

Une version ultérieure sera développée en :

- **PHP**
- **MySQL**

afin de reproduire exactement la même logique côté Back-End et comprendre les différences entre :

- stockage navigateur
- base de données relationnelle

---

## Résultat attendu

- Une application web fonctionnelle
- Hébergée sur un serveur distant
- Compatible mobile
- Respectant les bonnes pratiques Front-End
- Avec une logique claire et évolutive

---

## Auteur

Projet réalisé dans un cadre pédagogique  
par **David POTEL**  
Développeur Web – Front-End
