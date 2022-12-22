/**
 * Gère l'affichage et les intéractions de la page produit : product.html
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
// Récupere la valeur de 'id' dans l'URL
//------------------------------------------
const productId = new URLSearchParams(window.location.search).get("id");
//console.log(productId);


// ----------------------------------------
// Insére le produit suivant l'id de l'URL et l'API (fetch) sur la page produit : product.html
//------------------------------------------
if (productId !== null) {
    loadConfig()
    .then(data => {
        config = data;
        fetch(config.host + "/api/products/" + productId)
        .then(data => data.json())
        .then(jsonProduct => {
            //console.log(jsonProduct);
            let product = new Product(jsonProduct);
            document.title = product.name; // Ajout du nom du produit au title de la page 
            try {
                document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            } catch (Error) {
                console.log("Possible changement du sélecteur '.item__img' dans le fichier product.html", {Error});
            }
            try {
                document.querySelector("#title").innerHTML += `${product.name}`
            } catch (Error) {
                console.log("Possible changement du sélecteur '#title' dans le fichier product.html", {Error});
            }
            try {
                document.querySelector("#price").innerHTML += `${product.price}`
            } catch (Error) {
                console.log("Possible changement du sélecteur '#price' dans le fichier product.html", {Error});
            }
            try {
                document.querySelector("#description").innerHTML += `${product.description}`
            } catch (Error) {
                console.log("Possible changement du sélecteur '#description' dans le fichier product.html", {Error});
            }
            try {
                product.colors.forEach(element => {
                    document.querySelector("#colors").innerHTML += `<option value="${element}">${element}</option>`
                    }); 
            } catch (Error) {
                console.log("Possible changement du sélecteur '#colors' dans le fichier product.html", {Error});
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

// ----------------------------------------
// Ajout du produit dans le localStorage avec les paramètres de l'id du produit, la quantité et la couleur
//------------------------------------------

// -- Variables --
const addToCart = document.getElementById('addToCart');
const productColor = document.getElementById('colors');
const productQuantity = document.getElementById('quantity')

// -- Fonctions --
function getProducts(){ // Lecture des données du produit au format JSON du LocalStorage 
    let listProducts = localStorage.getItem("listProducts");
    if(listProducts == null){
        return [];
    }else{
        return JSON.parse(listProducts);
    }
}

function addProduct(listProducts) { // Ajout du produit - si même id et même couleur, incrémentation de la quantité
    let findProduct = listProducts.filter(item => item.id == productId && item.color == productColor.value);
    if (findProduct.length > 0) {
        findProduct[0].quantity += productChoice.quantity;
    } else {
        listProducts.push({id: productId, color: productColor.value, quantity: parseInt(productQuantity.value)});
    }
}

function saveProduct(listProducts) { // Mémorisation des données du produit dans le localStorage au format JSON
    localStorage.setItem("listProducts",JSON.stringify(listProducts));
}

// -- Appel des fonctions au clic du bouton "Ajouter au panier" --
addToCart.addEventListener('click', () => {
    if (!productColor.value) { // Si pas de couleur selectionnée, un message est affiché à l'écran
        alert("🎨 Veuillez choisir une couleur") 
        return;
    }
    if (productQuantity.value ==0 || productQuantity.value > 100) { // Si la quantité est nulle ou est supérieure à 100, un message est affiché à l'écran
        alert("🔢 Veuillez sélectionner une quantité entre 1 et 100") 
        return;
    }
    productChoice = {id: productId, color: productColor.value, quantity: parseInt(productQuantity.value)};
    let listProducts = getProducts();
    addProduct(listProducts);
    saveProduct(listProducts);
})
