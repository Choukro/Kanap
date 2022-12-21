/**
 * Gère l'affichage et les intéractions de la page d'accueil : index.html
 */

// ----------------------------------------
// Chargement du fichier config.json 
//------------------------------------------
async function loadConfig() {
    let result = await fetch("../config.json");
    return result.json();
}


// ----------------------------------------
// Crée et initialise l'objet Product
//------------------------------------------
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
        //console.log(jsonProduct);
    }
}

// ----------------------------------------
// Insére les produits de l'API (fetch) dans la page d’accueil
//------------------------------------------

loadConfig()
.then(data => {
    config = data;
    fetch(config.host + "/api/products")
    .then(data => data.json())
    .then(jsonListProduct => {
        //console.log(jsonListProduct);
        for(let jsonProduct of jsonListProduct) {
            let product = new Product(jsonProduct);
            try {
                document.querySelector("#items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                                <article>
                                                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                <h3 class="productName">${product.name}</h3>
                                                                <p class="productDescription">${product.description}</p>
                                                                </article>
                                                                </a>`
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