// script2.js
function volverAInicio() {
    window.location.href = 'index.html';
}

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    
    // Duplicamos el contenido del carrusel para que parezca infinito
    const clonedGallery = gallery.cloneNode(true);
    document.querySelector(".gallery-container").appendChild(clonedGallery);
});
