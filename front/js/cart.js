/**
 * Gère l'affichage et les intéractions de la page panier : cart.html
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
// Récupération du panier via localStorage puis affichage des produits sur la page
//------------------------------------------

// -- Fonctions --
function getProducts(){ // Lecture des données du produit au format JSON du LocalStorage 
    let listProducts = localStorage.getItem("listProducts");
    if(listProducts == null){
        return [];
    }else{
        return JSON.parse(listProducts);
    }
}

// -- Affichage du panier via localStorage --
let listProducts = getProducts();

// -- Variables --
const selectors = ['#cartAndFormContainer>h1', '#totalQuantity', '#totalPrice', 'order'];
let totalPrice = [];
let totalQuantity = [];
let orderPrice = [];
let orderQuantity =[];
 
// -- Cas du panier vide --
if (listProducts.length == 0 ) { 
    try {
        document.title = "Votre panier est vide";
        document.querySelector(selectors[0]).innerHTML += " est vide";
        document.querySelector(selectors[1]).innerHTML = "0";
        document.querySelector(selectors[2]).innerHTML = "0";
        document.getElementById(selectors[3]).style.display = "none";
    } catch (Error) {
        console.log("Possible changement des sélecteurs dans le fichier cart.html", {selectors}, {Error});
    }
// -- Cas du panier non vide --
} else { 
    document.title = "Votre panier";
    loadConfig()
    .then(data => {
        for (i = 0 ; i < listProducts.length ; i += 1) {
            let idProduct = listProducts[i].id;
            let colorProduct = listProducts[i].color;
            let quantityProduct = listProducts[i].quantity;
            config = data;
            fetch(config.host + "/api/products/" + idProduct)
            .then(data => data.json())
            .then(jsonProduct => {
                //console.log(jsonProduct);
                let product = new Product(jsonProduct);
                let priceProduct = parseInt(product.price) * quantityProduct;
                totalQuantity.push(quantityProduct);
                totalPrice.push(priceProduct);
                try {
                    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${idProduct}" data-color="${colorProduct}">
                                                                        <div class="cart__item__img">
                                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                        </div>
                                                                        <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${product.name}</h2>
                                                                            <p>Couleur : ${colorProduct}</p>
                                                                            <p>Prix : ${priceProduct} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : ${quantityProduct}</p>
                                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProduct}">
                                                                            </div>
                                                                            <div class="cart__item__content__settings__delete">
                                                                            <p class="deleteItem">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </article>`
                } catch (Error) {
                    console.log("Possible changement du sélecteur '#cart__items' dans le fichier cart.html", {Error});
                }
                orderPrice = totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                orderQuantity = totalQuantity.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                document.querySelector(selectors[1]).innerHTML = orderQuantity;
                document.querySelector(selectors[2]).innerHTML = orderPrice;
            })
        }
    })
}