let priorite = [
  {
    idPriorite: 1,
    label: "Très urgent",
    description: "Tâche critique nécessitant une action immédiate.",
    couleur: "#ff0000"
  },
  {
    idPriorite: 2,
    label: "Urgent",
    description: "Tâche importante à réaliser rapidement.",
    couleur: "#ff8000"
  },
  {
    idPriorite: 3,
    label: "Moyenne",
    description: "Tâche à faire, mais sans contrainte immédiate.",
    couleur: "#ffff00"
  },
  {
    idPriorite: 4,
    label: "Basse",
    description: "Tâche à effectuer quand on a le temps.",
    couleur: "#80ff00"
  },
  {
    idPriorite: 5,
    label: "Optionnelle",
    description: "Tâche non prioritaire, qui peut être reportée indéfiniment.",
    couleur: "#0080ff"
  }
];

let etiquette = [
  {
    idEtiquette: 1,
    label: "Perso",
    description:
      "Tâches personnelles, liées à la vie quotidienne ou aux loisirs."
  },
  {
    idEtiquette: 2,
    label: "Pro",
    description: "Tâches professionnelles, liées au travail ou aux projets."
  }
];

let statut = [
  {
    idStatut: 1,
    label: "A faire",
    description: "Tâche à réaliser, pas encore commencée."
  },
  {
    idStatut: 2,
    label: "En cours",
    description: "Tâche actuellement en cours de réalisation."
  },
  {
    idStatut: 3,
    label: "Terminée",
    description: "Tâche achevée avec succès."
  },
  {
    idStatut: 4,
    label: "Supprimée",
    description: "Tâche annulée ou non nécessaire."
  }
];

// Fonction pour afficher les tâches sur la page 2
function afficherTaches() {
  let listeTachesDiv = document.getElementById("listeTaches"); // Récupère l'élément HTML qui contient la liste des tâches
  listeTachesDiv.innerHTML = ""; // Vide la liste des tâches avant de l'afficher

  let taches = JSON.parse(localStorage.getItem("dataTache")); // Récupérer les données de la clé "dataTache" dans le localStorage

  if (taches.length === 0) return; // Si la liste est vide, on ne fait rien

  // Créer le tableau
  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.width = "100%";
  
  // Créer l'en-tête
  let thead = table.createTHead(); // Créer la partie en-tête
  let headerRow = thead.insertRow(); // Créer la ligne de l'en-tête

  let headers = [
    "Titre",
    "Description",
    "Priorité",
    "Étiquette",
    "Date de création",
    "Date d’échéance",
    "Statut",
    "Action"
  ];

  headers.forEach((text) => { // Pour chaque en-tête
    let th = document.createElement("th"); // Créer un élément th
    th.textContent = text; // Mettre le texte dans l'élément th
    th.style.padding = "8px";
    th.style.backgroundColor = "#f2f2f2";
    headerRow.appendChild(th); // Ajouter l'élément th à la ligne de l'en-tête
  });

  // Corps du tableau
  let tbody = table.createTBody();

  taches.forEach((tache) => { // Pour chaque tâche
    let idPriorite = parseInt(tache.idPriorite); // Convertir l'ID de priorité en nombre
    let idEtiquette = parseInt(tache.idEtiquette); // Convertir l'ID d'étiquette en nombre

    let prioriteObj = priorite.find((p) => p.idPriorite === idPriorite); // Récupérer l'objet de priorité
    let etiquetteObj = etiquette.find((e) => e.idEtiquette === idEtiquette); // Récupérer l'objet d'étiquette

    if (!prioriteObj || !etiquetteObj) return; // Si l'objet n'est pas trouvé, on ne fait rien

    let couleur = prioriteObj.couleur; // Récupérer la couleur de la priorité
    let labelPriorite = prioriteObj.label; // Récupérer le label de la priorité
    let labelEtiquette = etiquetteObj.label; // Récupérer le label d'étiquette

    const dateCreation = moment(tache.dateCreation).format("DD/MM/YYYY");
    const dateEcheance = moment(tache.dateEcheance).format("DD/MM/YYYY");

    let row = tbody.insertRow(); // Créer une ligne dans le corps du tableau
    row.style.background = `linear-gradient(to right, ${couleur}30, transparent)`; // Le 30 ajouté à la fin de la couleur héxadécimal est un code de transparence en hexadécimal.

    // Colonnes
    let titleCell = row.insertCell(); // Crée une cellule dans la ligne
    titleCell.textContent = tache.titre; // Insère le texte du titre dans la cellule
    titleCell.style.borderLeft = `5px solid ${couleur}`;
    titleCell.style.whiteSpace = "normal"; // Mettre le texte en plusieurs lignes
    titleCell.style.height = "auto"; // Mettre la hauteur de la cellule automatique

    let descCell = row.insertCell(); // Créer une cellule pour la description
    descCell.textContent = tache.description; // Mettre le texte dans la cellule
    descCell.style.whiteSpace = "normal"; // Mettre le texte en plusieurs lignes
    descCell.style.height = "auto"; // Mettre la hauteur de la cellule automatique
    
    row.insertCell().textContent = labelPriorite; // Mettre le label de priorité dans la cellule
    row.insertCell().textContent = labelEtiquette; // Mettre le label d'étiquette dans la cellule
    row.insertCell().textContent = dateCreation; // Mettre la date de création dans la cellule
    row.insertCell().textContent = dateEcheance; // Mettre la date d'échéance dans la cellule

    // Statut - select
    let statutCell = row.insertCell(); // Créer une cellule pour le statut
    let select = document.createElement("select"); // Créer un élément select
    select.style.border = "2px solid #6ba8f7";
    select.style.borderRadius = "5px";
    select.style.padding = "4px";
    select.id = `statutSelect${tache.idTache}`; // Ajouter un ID à l'élément select

    statut.forEach((s) => { // Pour chaque statut
      let option = document.createElement("option"); // Créer un élément option
      option.value = s.idStatut; // Mettre la valeur de l'option
      option.textContent = s.label; // Mettre le texte de l'option
      if (s.idStatut == tache.idStatut) option.selected = true; // Si l'option correspond au statut de la tâche, la sélectionner
      select.appendChild(option); // Ajouter l'option à l'élément select
    });

    // Écouteur de changement de statut
    select.addEventListener("change", function (e) { // Lorsqu'un changement de statut est détecté
      let nouveauStatut = parseInt(e.target.value); // Récupérer le nouveau statut
      let dataTaches = JSON.parse(localStorage.getItem("dataTache")) || []; // Récupérer les données de tâches
      let indexTache = dataTaches.findIndex((t) => t.idTache === tache.idTache); // Récupérer l'index de la tâche

        if (nouveauStatut === 4) { // Si le nouveau statut est 4 (Terminé)
          dataTaches.splice(indexTache, 1); // Supprimer la tâche des données
        } else {
          dataTaches[indexTache].idStatut = nouveauStatut; // Mettre le nouveau statut dans les données
        }

        localStorage.setItem("dataTache", JSON.stringify(dataTaches));
        afficherTaches(); // Rafraîchit
    });

    statutCell.appendChild(select); // Ajouter l'élément select à la cellule

    // Bouton Modifier
    let actionCell = row.insertCell(); // Créer une cellule pour les actions
    let btn = document.createElement("button"); // Créer un bouton
    btn.classList.add("btn-modifier"); // Ajouter une classe au bouton pour modification CSS
    btn.textContent = "Modifier"; // Mettre le texte du bouton
    btn.onclick = () => modifierTache(tache.idTache); // Lorsqu'on clique sur le bouton, appeler la fonction de modification de tâche
    actionCell.appendChild(btn); // Ajouter le bouton à la cellule
  });

  // Ajout du tableau au DOM
  listeTachesDiv.appendChild(table);
}


// Fonction pour trier les tâches
function trierTaches() {
  let critereTri = document.getElementById("tri").value; // Récupère le critère de tri
  let taches = JSON.parse(localStorage.getItem("dataTache")) || []; // Récupère les données de la session sinon un tableau vide

  if (taches.length === 0) return; // Si aucune tâche, on arrête

   // Tri des tâches selon le critère choisi
  switch (critereTri) { // Utilisation de .sort() pour trier le tableau taches
    case "priorite":
      taches.sort((a, b) => parseInt(a.idPriorite) - parseInt(b.idPriorite)); // tri par idPriorité du plus petit au plus grand
      break;
    case "dateCreation":
      taches.sort(
        (a, b) => new Date(a.dateCreation) - new Date(b.dateCreation)); // Trie par date de création, si le résultat est négatif → a vient avant b
      break;
    case "dateEcheance":
      taches.sort(
        (a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance)); // Si le résultat est positif → a vient après b
      break;
    case "statut":
      taches.sort((a, b) => parseInt(a.idStatut) - parseInt(b.idStatut)); // Si le résultat est zéro → a et b sont considérés comme équivalents
      break;
  }

  localStorage.setItem("dataTache", JSON.stringify(taches)); // Stocke les données triées dans le localstorage
  afficherTaches(); // Rafraîchit la liste des tâches
}

// Fonction pour modifier les tâches
function modifierTache(idTache) {
  let dataStringTache = localStorage.getItem("dataTache");
  let taches = JSON.parse(dataStringTache);

  // Trouver la tâche à modifier
  let tacheAModifier = taches.find((t) => t.idTache === idTache); // Récupère la tâche correspondant à l'idTache

  if (tacheAModifier) {
    // Stocker les données de la tâche dans le localStorage sous une clé provisoire
    localStorage.setItem("tacheTemporaire", JSON.stringify(tacheAModifier));

    // Rediriger vers la page d'édition
    window.location.href = "index.html";
  }
}


