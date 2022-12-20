/**
 * Gère l'affichage et les intéractions de la page d'accueil
 */

// ----------------------------------------
// Chargement du fichier config.json 
//------------------------------------------
async function loadConfig(){
    let result = await fetch("../config.json");
    return result.json();
}


// ----------------------------------------
// Crée et initialise l'objet Product
//------------------------------------------
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

// ----------------------------------------
// Insére les produits de l'API (fetch) dans la page d’accueil
//------------------------------------------
loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/products")
        .then(date => date.json())
        .then(jsonListProduct => {
            for(let jsonProduct of jsonListProduct) {
                let product = new Product(jsonProduct);
                document.querySelector("#items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                                    <article>
                                                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                    <h3 class="productName">${product.name}</h3>
                                                                    <p class="productDescription">${product.description}</p>
                                                                    </article>
                                                                </a>`
            }
        });
})