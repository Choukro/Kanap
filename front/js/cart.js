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

function saveProduct(listProducts) { // Mémorisation des données du produit dans le localStorage au format JSON
    localStorage.setItem("listProducts",JSON.stringify(listProducts));
}

function changeQuantity() { // Gère le changement de la quantité d'un produit avec mise à jour du LocalStorage et DOM
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach((item) => {
        item.addEventListener("change", (event) => {
            event.preventDefault();
            let changeProduct = item.closest('article');
            const tempChangeProduct = listProducts.find(element => element.id == changeProduct.dataset.id && element.color == changeProduct.dataset.color);
            if (parseInt(item.value) == 0 || parseInt(item.value) > 100) { // Si la quantité est nulle ou est supérieure à 100, un message est affiché à l'écran
                alert("🔢 Veuillez sélectionner une quantité entre 1 et 100.\n\n👉 Veuillez modifier la quantité choisie !") 
                return
            }
            tempChangeProduct.quantity = parseInt(item.value);
            saveProduct(listProducts);
            window.location.href = "cart.html";
        })
    })
}

function deleteProduct() { // Gère la suppression d'un produit avec mise à jour du LocalStorage et DOM
    let deleteProduct = document.querySelectorAll(".deleteItem");
    deleteProduct.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            let deleteitem = item.closest('article');
            const tempDeleteProduct = listProducts.find(element => element.id == deleteitem.dataset.id && element.color == deleteitem.dataset.color);
            listProducts = listProducts.filter(objet => objet != tempDeleteProduct);
            saveProduct(listProducts);
            window.location.href = "cart.html";
        })
    })
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
                                                                            <p>Prix unitaire : ${product.price} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté :</p>
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
                changeQuantity();
                deleteProduct();
            })
        }
    })
}

// ----------------------------------------
// 
//------------------------------------------

// -- Variables --

// -- Récupération des ID pour l'envoir des données à l'API  --
let getProductsId = listProducts.map(item => item.id);
console.log(getProductsId)

const order = {
    contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    },
    products : getProductsId,
}

// -- Ajout de pattern pour validation des champs avec des lettres --
let patternFirstName = document.querySelector("#firstName");
patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà]*");
let patternLastName = document.querySelector("#lastName");
patternLastName.setAttribute("pattern", "[a-zA-Z-éèà]*");
let patternCity = document.querySelector("#city");
patternCity.setAttribute("pattern", "[a-zA-Z-éèà]*");

document.querySelector(".cart__order__form__submit").addEventListener("click", async (e) => {
    let valid = true;
    for(let input of document.querySelectorAll(".cart__order__form__question")) {
        valid &= input.reportValidity();
        if(!valid) {
            break;
        }
    }
    if (valid) {
        try {
            const res = await fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(order),
            });
            const confirm = await res.json();
            window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
            localStorage.clear();
        } catch (error) {
            console.log(`erreur : ${error}`);
        }
    }
})