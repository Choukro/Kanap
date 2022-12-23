/**
 * Gère l'affichage et les intéractions de la page confirmation : confirmation.html
 */

const orderId = new URLSearchParams(window.location.search).get("orderId");
if (orderId === "undefined") {
    alert ("❌ Une erreur s'est produite lors de la validation de votre panier. \n\n💡 Vous allez être redirigé de nouveau vers notre catalogue de produits\n\n🙏 Nous vous prions de nous excuser pour la gêne occasionnée !");
    window.location.href = "index.html";
} else {
    document.getElementById("orderId").innerHTML += `${orderId}`;
}

