var form = document.querySelector("form#options_connexion"),
    identifiant = form.querySelector("#input_identifiant"),
    domaine = form.querySelector("#input_domaine"),
    motdepasse = form.querySelector("#input_motdepasse"),

    identifiant_valeur = domaine_valeur = motdepasse_valeur = "";

chrome.storage.sync.get(["identifiant", "domaine"], function(options) {
    if(options.identifiant != void 0) {
        identifiant.value = options.identifiant;
    }

    if(options.domaine != void 0) {
        domaine.value = options.domaine;
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    identifiant_valeur = identifiant.value;
    domaine_valeur = domaine.value;
    motdepasse_valeur = motdepasse.value;

    if(identifiant_valeur == "" || domaine_valeur == "" || motdepasse_valeur == "") {
        alert("Merci de renseigner tous les champs !");
        return;
    }

    chrome.storage.sync.set({"identifiant" : identifiant_valeur, "domaine" : domaine_valeur, "motdepasse" : motdepasse_valeur}, function() {

        chrome.storage.sync.get(["identifiant", "domaine", "motdepasse"], function(options) {
            console.log(options);

            if(options.identifiant == identifiant_valeur
            && options.domaine == domaine_valeur
            && options.motdepasse == motdepasse_valeur) {
                alert('Les options ont bien étés sauvegardées');
            } else {
                alert('Une erreur s\'est produite lors de la sauvegarde des options');
            }
        });
    });

}, false);
