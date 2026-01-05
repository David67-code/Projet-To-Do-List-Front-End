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
  listeTachesDiv.innerHTML = ""; // Effacement du contenu de la liste des tâches avant de réécrire cette liste

  let taches = JSON.parse(localStorage.getItem("dataTache")); // Récupère les données de la clé "dataTache" dans le localStorage 

  taches.forEach((tache) => { // Boucle sur chaque tâche
    let idPriorite = parseInt(tache.idPriorite); // Convertit la priorité en nombre
    let idEtiquette = parseInt(tache.idEtiquette); // Convertit l'étiquette en nombre

    let prioriteObj = priorite.find((p) => p.idPriorite === idPriorite); // Trouve l'objet correspondant à la priorité
    let etiquetteObj = etiquette.find((e) => e.idEtiquette === idEtiquette); // Trouve l'objet correspondant à l'étiquette

    if (!prioriteObj || !etiquetteObj) return; // Si l'objet n'est pas trouvé, on passe à la tâche suivante

    let couleur = prioriteObj.couleur; // Récupère la couleur de la priorité
    let labelPriorite = prioriteObj.label; // Récupère le label de la priorité
    let labelEtiquette = etiquetteObj.label; // Récupère le label de l'étiquette

    const dateCreation = moment(tache.dateCreation).format("DD/MM/YYYY");
    const dateEcheance = moment(tache.dateEcheance).format("DD/MM/YYYY");

    let tacheDiv = document.createElement("div"); // Crée un élément HTML div
    tacheDiv.classList.add("tache");
    tacheDiv.style.border = `5px solid ${couleur}`;
    tacheDiv.style.padding = "10px";
    tacheDiv.style.margin = "8px";
    tacheDiv.style.borderRadius = "5px";
    tacheDiv.style.background = `linear-gradient(to bottom, ${couleur}30, transparent)`; // Le 30 à la fin de la couleur hex donne de la transparence

    let optionsStatut = statut.map((s) => `<option value="${s.idStatut}" ${s.idStatut == tache.idStatut ? "selected" : ""}>${s.label}</option>`).join(""); // Crée les options pour le statut

    tacheDiv.innerHTML = `
      <div style="text-align: center; font-weight: bold;font-size: 1.2rem; color: ${couleur}; margin-bottom: 10px;">Priorité : ${labelPriorite}</div><br>
      <strong>${tache.titre}</strong><br><br>
      <div style="white-space: normal; word-wrap: break-word; max-width: 100%; text-align: justify;">${tache.description}</div><br>
      <strong>Étiquette :</strong> ${labelEtiquette}<br><br>
      <strong>Date de création : </strong>${dateCreation}<br>
      <strong>Date d'échéance : </strong>${dateEcheance}<br><br>
      <label for="statutSelect${tache.idTache}">Statut :</label>
      <select id="statutSelect${tache.idTache}" style="border: 2px solid #6ba8f7; border-radius: 5px; padding: 4px;">${optionsStatut}</select>
      <div class="button-container"> 
        <button onclick="modifierTache(${tache.idTache})">Modifier</button>
      </div>
    `; // Crée le contenu de la tâche

    // Mise à jour du statut
    tacheDiv.querySelector(`#statutSelect${tache.idTache}`).addEventListener("change", function (e) { // Ajoute un événement change au select 
        let nouveauStatut = parseInt(e.target.value); // Récupère la valeur sélectionnée
        let dataTaches = JSON.parse(localStorage.getItem("dataTache")); // Récupère les données de la tâche
        let indexTache = dataTaches.findIndex((t) => t.idTache === tache.idTache); // Trouve l'index de la tâche

          if (nouveauStatut === 4) { 
            dataTaches.splice(indexTache, 1); // Supprime si le statut est "Supprimée"
          } else {
            dataTaches[indexTache].idStatut = nouveauStatut; // Met à jour le statut
          }

          localStorage.setItem("dataTache", JSON.stringify(dataTaches)); // Met à jour les données dans le localStorage
          afficherTaches(); // Rafraîchit la liste des tâches
      });

    listeTachesDiv.appendChild(tacheDiv); // Ajoute la tâche au conteneur de liste
  });
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


