/**
 * Gère l'affichage et les intéractions de la page produit : product.html
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
// Récupere la valeur de 'id' dans l'URL
//------------------------------------------
 const productId = new URLSearchParams(window.location.search).get("id");
 //console.log(productId);


 if (productId !== null) {
    loadConfig()
    .then(data => {
        config = data;
        fetch(config.host + "/api/products/" + productId)
        .then(data => data.json())
        .then(jsonProduct => {
            //console.log(jsonProduct);
            let product = new Product(jsonProduct);
            document.title = product.name;
            try {
                document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            } catch (Error) {
                console.log("Possible changement du sélecteur '.item__img' dans le fichier index.html", {Error});
            }
            try {
                document.querySelector("#title").innerHTML += `${product.name}`
            } catch (Error) {
                console.log("Possible changement du sélecteur '#title' dans le fichier index.html", {Error});
            }
            try {
                document.querySelector("#price").innerHTML += `${product.price}`
            } catch (Error) {
                console.log("Possible changement du sélecteur '#price' dans le fichier index.html", {Error});
            }
            try {
                document.querySelector("#description").innerHTML += `${product.description}`
            } catch (Error) {
                console.log("Possible changement du sélecteur '#description' dans le fichier index.html", {Error});
            }
            try {
                product.colors.forEach(element => {
                    document.querySelector("#colors").innerHTML += `<option value="${element}">${element}</option>`
                    }); 
            } catch (Error) {
                console.log("Possible changement du sélecteur '#colors' dans le fichier index.html", {Error});
            }
        })
        .catch(Error => {
            console.log("Problème d'accès à l'API - voir le fichier config.json", {Error});
            alert("❌ Une erreur s'est produite. Le produit sélectionné n'a pas été trouvé !\n\n💡 Essayez d'actualisez la page\n\n🙏 Nous vous prions de nous excuser pour la gêne occasionnée !");
        })
    })
 }
 else{
    console.log("Il manque l'ID du produit dans l'url pour afficher la page.");
    alert("❌ Une erreur s'est produite.\n\n💡 Vous allez être redirigé vers notre catalogue de produits\n\n🙏 Nous vous prions de nous excuser pour la gêne occasionnée !");
    window.location.href = "index.html";
 }