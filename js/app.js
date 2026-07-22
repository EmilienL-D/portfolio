// ===============================
// Portfolio - Emilien
// Gestion de la navigation
// ===============================

const contenu = document.getElementById("contenu");

const pages = {
    accueil: "pages/accueil.html",
    competences: "pages/competences.html",
    projets: "pages/projets.html",
    contact: "pages/contact.html"
};

async function chargerPage(page) {

    try {

        console.log("Chargement de :", pages[page]);

        const reponse = await fetch(
            pages[page] + "?t=" + new Date().getTime(),
            {
                cache: "no-store"
            }
        );

        if (!reponse.ok) {
            throw new Error("Erreur HTTP : " + reponse.status);
        }

        const html = await reponse.text();

        contenu.innerHTML = html;

        console.log(page + " chargé avec succès.");

    } catch (error) {

        console.error(error);

        contenu.innerHTML = `
            <section>
                <h2>Erreur</h2>
                <p>Impossible de charger la page demandée.</p>
            </section>
        `;

    }

}

// Chargement de la page d'accueil au démarrage
chargerPage("accueil");

// Gestion des clics sur les onglets
document.querySelectorAll("[data-page]").forEach(lien => {

    lien.addEventListener("click", function(e){

        e.preventDefault();

        chargerPage(this.dataset.page);

    });

});

document.addEventListener("click", async (event) => {

    const carte = event.target.closest(".carte-projet");

    if (!carte) return;

    event.preventDefault();

    const reponse = await fetch(carte.dataset.page + "?t=" + Date.now(), {
        cache: "no-store"
    });

    contenu.innerHTML = await reponse.text();

});
