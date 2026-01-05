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

let tache = []; // Création du tableau des tâches

// Fonction pour ajouter une tâche
function ajouterTache() {
  let dataStringTache = localStorage.getItem("dataTache"); // Récupération des données du local storage à partir de la clé "dataTache"
  if (dataStringTache != null) {
    tache = JSON.parse(dataStringTache); // Si les données existent, on les parse pour les convertir en tableau JavaScript
  }

  // Récupération des valeurs des champs du formulaire
  let titreTache = document.getElementById("titre").value;
  let descriptionTache = document.getElementById("description").value;
  let prioriteTache = document.getElementById("idPriorite").value;
  let etiquetteTache = document.getElementById("idEtiquette").value;
  let statutTache = 1; // "A faire" par défaut lors de l'affichage d'une tâche
  let dateCreationTache = document.getElementById("dateCreation").value;
  let dateEcheanceTache = document.getElementById("dateEcheance").value;

  // Vérification des champs obligatoires
  let champsObligatoires = [
    { id: "titre", nom: "Titre" },
    { id: "description", nom: "Description" },
    { id: "idPriorite", nom: "Priorité" },
    { id: "idEtiquette", nom: "Étiquette" },
    { id: "dateCreation", nom: "Date de création" },
    { id: "dateEcheance", nom: "Date d'échéance" }
  ];

  let formulaireValide = true;
  let messageErreur = "Veuillez remplir les champs suivants :\n";

  champsObligatoires.forEach((champ) => { // Boucle pour vérifier chaque champ du formulaire
    let element = document.getElementById(champ.id);
    if (!element.value.trim()) { // Si le champ est vide
      formulaireValide = false; // le formulaire n'est pas valide
      messageErreur += `- ${champ.nom}\n`; // Ajout du nom du champ à la liste des erreurs
      element.style.border = "2px solid red"; // Ajout d'une bordure rouge pour indiquer l'erreur
    } else {
      element.style.border = ""; // Suppression de la bordure rouge si le champ est rempli
    }
  });

  if (!formulaireValide) {
    alert(messageErreur); // Affichage d'un message d'erreur si l'un des champs est vide
    return; //
  }

  // Récupérer l'élément du champ date échéance
  let champDateEcheance = document.getElementById("dateEcheance");

  try {
    // Comparaison des dates
    let creation = new Date(dateCreationTache); 
    let echeance = new Date(dateEcheanceTache);

    // On ignore les heures pour la comparaison
    creation.setHours(0, 0, 0, 0);
    echeance.setHours(0, 0, 0, 0);

    if (echeance < creation) {
      // Ajouter une bordure rouge
      champDateEcheance.style.border = "2px solid red";
      throw new Error(
        "La date d'échéance ne peut pas être antérieure à la date de création."
      );
    }

    // Si tout est OK, retirer le style d'erreur
    champDateEcheance.style.border = "";

    // Si tout est OK, création de la tâche
    let newIdTache = tache.length + 1; // Génération d'un ID unique pour la nouvelle tâche
    let newTache = {
      idTache: newIdTache,
      titre: titreTache,
      description: descriptionTache,
      idPriorite: prioriteTache,
      idEtiquette: etiquetteTache,
      idStatut: statutTache,
      dateCreation: dateCreationTache,
      dateEcheance: dateEcheanceTache
    };

    tache.push(newTache); // On ajoute la nouvelle tâche dans le tableau des tâches

    let tacheString = JSON.stringify(tache); // On convertit le tableau des tâches en chaîne de caractères JSON
    localStorage.setItem("dataTache", tacheString); // Stockage des données dans le localStorage avec la clé "dataTache"
    document.getElementById("tacheForm").reset(); // Remise à zéro du formulaire de saisie de tâche

    alert("La tâche a été ajoutée avec succès.");

  } catch (error) {
    alert(error.message);
    return; // On arrête l'exécution si la date est incorrecte
  }
}

// Fonction pour afficher la tâche dans le formulaire lors d'une modification
window.addEventListener("DOMContentLoaded", function () {
  // Vérifier si des données temporaires sont présentes dans le localStorage
  let tacheTemporaire = JSON.parse(localStorage.getItem("tacheTemporaire"));

  if (tacheTemporaire) {
    // Remplir le formulaire avec les données de la tâche
    document.getElementById("titre").value = tacheTemporaire.titre; 
    document.getElementById("description").value = tacheTemporaire.description;
    document.getElementById("idPriorite").value = tacheTemporaire.idPriorite;
    document.getElementById("idEtiquette").value = tacheTemporaire.idEtiquette;
    
    // Formater et remplir les dates au bon format
    document.getElementById("dateCreation").value = moment(tacheTemporaire.dateCreation).format("YYYY-MM-DD");
    document.getElementById("dateEcheance").value = moment(tacheTemporaire.dateEcheance).format("YYYY-MM-DD");

    let boutonForm = document.querySelector("button[type='button']"); // Récupérer le bouton de modification
    boutonForm.textContent = "Sauvegarder les modifications"; // Changer le texte du bouton
    boutonForm.setAttribute("onclick", `sauvegarderModification(${tacheTemporaire.idTache})`); // Changer l'événement du bouton

    // Modifier le titre <h2>
    const titreH2 = document.querySelector("main h2");
    if (titreH2) {
      titreH2.textContent = "Modifier une tâche";
    }
  }
});

// Fonction pour sauvegarder les modifications
function sauvegarderModification(idTache) {
  let dataStringTache = localStorage.getItem("dataTache");
  let taches = JSON.parse(dataStringTache);

  // Trouver la tâche à modifier
  let tacheAModifier = taches.find((t) => t.idTache === idTache);

  // Champs obligatoires à vérifier
  let champsObligatoires = [
    { id: "titre", nom: "Titre" },
    { id: "description", nom: "Description" },
    { id: "idPriorite", nom: "Priorité" },
    { id: "idEtiquette", nom: "Étiquette" },
    { id: "dateCreation", nom: "Date de création" },
    { id: "dateEcheance", nom: "Date d'échéance" }
  ];

  let formulaireValide = true;
  let messageErreur = "Veuillez remplir les champs suivants :\n"; 

  champsObligatoires.forEach((champ) => { // Vérifier chaque champ obligatoire
    let element = document.getElementById(champ.id);
    if (!element || !element.value.trim()) { // Si le champ est vide ou inexistant
      formulaireValide = false; // Le formulaire n'est pas valide
      messageErreur += `- ${champ.nom}\n`;
      if (element) element.style.border = "2px solid red"; // Mettre une bordure rouge pour indiquer l'erreur
    } else {
      if (element) element.style.border = ""; // Enlever la bordure rouge si le champ est valide
    }
  });

  if (!formulaireValide) { // Si le formulaire n'est pas valide
    alert(messageErreur); // Afficher un message d'erreur
    return;
  }

  // Comparaison des dates (en ignorant les heures)
  let dateCreation = new Date(document.getElementById("dateCreation").value);
  let dateEcheance = new Date(document.getElementById("dateEcheance").value);

  dateCreation.setHours(0, 0, 0, 0);
  dateEcheance.setHours(0, 0, 0, 0);

  if (dateEcheance < dateCreation) {
    let champDateEcheance = document.getElementById("dateEcheance"); 
    champDateEcheance.style.border = "2px solid red"; // Mettre une bordure rouge pour indiquer l'erreur
    alert("La date d'échéance ne peut pas être antérieure à la date de création.");
    return;
  }

  // Mise à jour de la tâche
  tacheAModifier.titre = document.getElementById("titre").value;
  tacheAModifier.description = document.getElementById("description").value;
  tacheAModifier.idPriorite = document.getElementById("idPriorite").value;
  tacheAModifier.idEtiquette = document.getElementById("idEtiquette").value;
  tacheAModifier.dateCreation = document.getElementById("dateCreation").value;
  tacheAModifier.dateEcheance = document.getElementById("dateEcheance").value;

  // Enregistrement dans le localStorage
  localStorage.setItem("dataTache", JSON.stringify(taches));
  localStorage.removeItem("tacheTemporaire"); // Suppression de la tâche temporaire

  alert("Tâche modifiée avec succès !");

  window.location.href = "page2.html"; // Redirection vers la page 2
}
