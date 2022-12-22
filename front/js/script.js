/**
 * Gère l'affichage et les intéractions de la page d'accueil : index.html
 */

// ----------------------------------------
// Fonction loadConfig pour charger le fichier de configuration : config.json 
//------------------------------------------
async function loadConfig() {
    let result = await fetch("../config.json");
    return result.json();
}


// ----------------------------------------
// Classe pour créer et initialiser l'objet "Product" permettant de récupérer les détails des produits
//------------------------------------------
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
        //console.log(jsonProduct);
    }
}

// ----------------------------------------
// Insére les produits de l'API (fetch) dans la page d’accueil : index.html
//------------------------------------------

loadConfig() // Appel de la fonction loadConfig
.then(data => {
    config = data;
    fetch(config.host + "/api/products") 
    .then(data => data.json()) //Récupération des données brutes et transformation de ces données au format JSON
    .then(jsonListProduct => { //Liste des produits au format JSON
        //console.log(jsonListProduct);
        for(let jsonProduct of jsonListProduct) { //Boucle pour parcourir le tableau et créer une variable jsonProduct qui sera utilisé par la suite
            let product = new Product(jsonProduct); // Utilisation de la classe Product : pour chaque produit, création d'un objet product en lui passant le JSON
            try {
                document.querySelector("#items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                                <article>
                                                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                <h3 class="productName">${product.name}</h3>
                                                                <p class="productDescription">${product.description}</p>
                                                                </article>
                                                                </a>` // Création de la balise <article> pour chaque produit
            } catch (Error) {
                console.log("Possible changement du sélecteur '#items' dans le fichier index.html", {Error});
            }
            
        }
    })
    .catch(Error => {
        console.log("Problème d'accès à l'API - voir le fichier config.json", {Error});
        alert("❌ Une erreur s'est produite et vous n'avez pas accès à notre catalogue de produits.\n\n💡 Essayez d'actualisez la page pour recharger notre catalogue\n\n🙏 Nous vous prions de nous excuser pour la gêne occasionnée !");
    })
})