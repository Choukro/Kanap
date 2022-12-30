/**
 * Gère l'affichage et les intéractions de la page panier : cart.html
 */


async function loadConfig() { // Fonction loadConfig pour charger le fichier de configuration : config.json 
    let result = await fetch("../config.json");
    return result.json();
}
class Product { // Classe pour créer et initialiser l'objet "Product" permettant de récupérer les détails des produits
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
        //console.log(jsonProduct);
    }
}

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

function cartEmpty() { // Gère le cas du panier vide
    try {
        document.title = "Votre panier est vide";
        document.querySelector(selectors[0]).innerHTML += " est vide";
        document.querySelector(selectors[1]).innerHTML = "0";
        document.querySelector(selectors[2]).innerHTML = "0";
        document.querySelector(selectors[3]).style.display = 'none';
    } catch (Error) {
        console.log("Possible changement des sélecteurs dans le fichier cart.html", {selectors}, {Error});
    }
}

/* function updatedCart(totalPrice, totalQuantity) { // -- Gére la mise à jour du prix total de la commande ainsi que de la quantité de produits
    orderPrice = totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // Calcul du montant total
    orderQuantity = totalQuantity.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // Calcul de la quantité totale
    document.querySelector(selectors[1]).innerHTML = orderQuantity;
    document.querySelector(selectors[2]).innerHTML = orderPrice;
} */

function updateQuantity() { // -- Gére la mise à jour du prix total de la commande ainsi que de la quantité de produits
    orderQuantity = totalQuantity.reduce((orderQuantity, totalQuantity) => orderQuantity + totalQuantity, 0); // Calcul de la quantité totale
    document.querySelector(selectors[1]).innerHTML = orderQuantity;
}

function updatePrice() { // -- Gére la mise à jour du prix total de la commande ainsi que de la quantité de produits
    orderPrice = totalPrice.reduce((orderPrice, totalPrice) => orderPrice + totalPrice, 0); // Calcul du montant total
    document.querySelector(selectors[2]).innerHTML = orderPrice;
}


function changeQuantity(listProducts) { // Gère le changement de la quantité d'un produit avec mise à jour du LocalStorage et DOM
    try {
        let changeQuantity = document.querySelectorAll("input.itemQuantity");
        changeQuantity.forEach((item) => {
            item.addEventListener("change", (event) => {
                event.preventDefault();
                let changeProduct = item.closest('article');
                console.log("====")
                console.log(changeProduct)
                console.log("====")
                const tempChangeProduct = listProducts.find(element => element.id == changeProduct.dataset.id && element.color == changeProduct.dataset.color);
                if (parseInt(item.value) == 0 || parseInt(item.value) > 100) { // Si la quantité est nulle ou est supérieure à 100, un message est affiché à l'écran
                    alert("🔢 Veuillez sélectionner une quantité entre 1 et 100.\n\n👉 Veuillez modifier la quantité choisie !") 
                    return
                }
                tempChangeProduct.quantity = parseInt(item.value);
                saveProduct(listProducts);
                //---------------------
                orderQuantity = listProducts.reduce((orderQuantity, listProducts) => orderQuantity + listProducts.quantity,0);
                document.querySelector(selectors[1]).innerHTML = orderQuantity;
                window.location.reload();
            })
        })
    } catch (Error) {
        console.log("Possible changement du sélecteur '.itemQuantity' dans le fichier cart.html", {Error});
    } 
}

function deleteProduct(listProducts) { // Gère la suppression d'un produit avec mise à jour du LocalStorage et DOM
    try {
        let deleteProduct = document.querySelectorAll("p.deleteItem");
/*         console.log("====")
        console.log(deleteProduct)
        console.log("====") */
        deleteProduct.forEach((item) => {
            item.addEventListener("click", (event) => {
                event.preventDefault();
                let deleteitem = item.closest('article');
                const tempDeleteProduct = listProducts.find(element => element.id == deleteitem.dataset.id && element.color == deleteitem.dataset.color);
                listProducts = listProducts.filter(objet => objet != tempDeleteProduct);
                saveProduct(listProducts);
                const productToDelete = document.querySelector(`article[data-id="${deleteitem.dataset.id}"][data-color="${deleteitem.dataset.color}"]`)
                productToDelete.remove();
                //---------------------
                orderQuantity = listProducts.reduce((orderQuantity, listProducts) => orderQuantity + listProducts.quantity,0);
                document.querySelector(selectors[1]).innerHTML = orderQuantity;
                window.location.reload();
            })
        })
    } catch (Error) {
        console.log("Possible changement du sélecteur '.deleteItem' dans le fichier cart.html", {Error});
    }  
}

function saveFormData(formData) { // Enregistre les données saisies par l'utilisateur dans localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
};

function sendFormData(formData, getProductsId) { //Envoie les données saisies par l'utilisateur par une requête POST sur l’API
    let contact = formData;
    let products = getProductsId;
    const dataSent = {
        contact,
        products,
    }
/*     console.log("====")
    console.log(dataSent)
    console.log("====") */
    const options = {
        method: 'POST',
        body: JSON.stringify(dataSent),
        headers: { 
          'Content-Type': 'application/json',
        }
    };
/*     console.log("====")
    console.log(options)
    console.log("====") */
    fetch(config.host + "/api/products/order", options)
    .then(data => {
        if(!data.ok){
            console.log("Erreur de la requête POST sur l'API - retour du serveur : ", data.status);
            alert ("❌ Une erreur s'est produite lors de la validation de votre panier. \n\n 🙏 Veuillez réessayer de remplir le formulaire de commande ou contactez-nous par téléphone !");
        } else {
            data.json().then(jsonOrder => {
                document.location.href =`confirmation.html?orderId=${jsonOrder.orderId}`; //Rediriger l’utilisateur sur la page Confirmation, en passant l’id de commande dans l’URL
                localStorage.clear(); // Effacement du LocalStorage
            });
        }
    }) 
}


// -- Variables --
const selectors = ['#cartAndFormContainer>h1', '#totalQuantity', '#totalPrice', '.cart__order'];
const otherSelectors = [".cart__order__form__submit input", ".cart__order__form__question input", '#firstName', '#lastName', '#address', '#city', '#email'];
let totalPrice = [];
let totalQuantity = [];
let orderPrice = [];
let orderQuantity =[];

let listProducts = getProducts(); // -- Affichage du panier via localStorage --

if (listProducts.length == 0 ) { // -- Cas du panier vide --
    cartEmpty();
} else {
    document.title = "Votre panier";
    loadConfig()
    .then(data => {
/*         console.log("====")
        console.log(data)
        console.log("====") */
        for (i = 0 ; i < listProducts.length ; i += 1) {
            let idProduct = listProducts[i].id;
            let colorProduct = listProducts[i].color;
            let quantityProduct = listProducts[i].quantity;
/*             console.log("====")
            console.log(i, idProduct, colorProduct, quantityProduct)
            console.log("====") */
            config = data;
/*             console.log("====")
            console.log(config.host)
            console.log("====") */
            fetch(config.host + "/api/products/" + idProduct)
            .then(data => {
                if(!data.ok){
                    console.log("Problème d'accès à l'API - voir le fichier config.json - retour du serveur : ", data.status);
                    alert ("❌ Une erreur s'est produite lors du chargement de votre panier. \n\n 💡 Essayez d'actualisez la page pour recharger notre catalogue\n\n🙏 Nous vous prions de nous excuser pour la gêne occasionnée !");
                } else {
                    data.json().then(jsonProduct => {
                        let product = new Product(jsonProduct);
                        let priceProduct = parseInt(product.price) * quantityProduct; // Si prix unitaire pour chaque produit, cette variable peut être supprimée 
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
                        //updatedCart(totalPrice, totalQuantity);
                        updateQuantity()
                        /* console.log("====")
                        console.log(orderQuantity)
                        console.log("====") */
                        updatePrice()
                        /* console.log("====")
                        console.log(orderPrice)
                        console.log("====") */
                        changeQuantity(listProducts);
                        deleteProduct(listProducts);
                    })
                }
            })
            .catch(Error => {
                console.log("Problème connexion serveur", {Error});
                alert("❌ Une erreur s'est produite lors du chargement de votre panier. \n\n 💡 Essayez d'actualisez la page pour recharger notre catalogue\n\n🙏 Nous vous prions de nous excuser pour la gêne occasionnée !");
            })
        }
        let patternFirstName = document.querySelector("#firstName"); // Ajout de pattern pour validation du prénom
        patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà]*"); 
        let patternLastName = document.querySelector("#lastName"); // Ajout de pattern pour validation du Nom
        patternLastName.setAttribute("pattern", "[a-zA-Z-éèà]*");
        let patternCity = document.querySelector("#city"); // Ajout de pattern pour validation de la ville
        patternCity.setAttribute("pattern", "[a-zA-Z-éèà]*");
        let getProductsId = listProducts.map(parameter => parameter.id); // Récupération des ID pour l'envoir des données à l'API 
        try {
            document.querySelector(otherSelectors[0]).addEventListener("click", (event) => {
                event.preventDefault();
                let formData = {
                    firstName : document.querySelector(otherSelectors[2]).value,
                    lastName : document.querySelector(otherSelectors[3]).value,
                    address : document.querySelector(otherSelectors[4]).value,
                    city : document.querySelector(otherSelectors[5]).value,
                    email : document.querySelector(otherSelectors[6]).value
                };
                var valid = true;
                for(let input of document.querySelectorAll(otherSelectors[1])) { // Vérifie les données de saisies de l'utilsiateur
                    valid &= input.reportValidity();
                    if(!valid) {
                        break;
                    }
                }
                if (valid) {
                    saveFormData(formData);
                    sendFormData(formData, getProductsId);
                }
            })
        } catch (Error) {
            console.log("Possible changement des sélecteurs dans le fichier cart.html", {otherSelectors}, {Error});
        }       
    })
}