// Variables globales
let cart = [];

function addToCart(button) {
    const product = button.closest(".product");
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const imgSrc = product.querySelector("img").src;

    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
    }

    updateCart();
}

// Actualizar carrito
function updateCart() {
    const cartContainer = document.querySelector(".cart-items");
    const totalElement = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const cartFooter = document.querySelector(".cart-footer");
    cartContainer.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.imgSrc}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>S/ ${item.price.toFixed(2)}</p>
                    <div class="quantity">
                        <select onchange="updateQuantity('${item.name}', this.value)">
                            ${[...Array(10)].map((_, i) => `<option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    totalElement.textContent = `S/ ${total.toFixed(2)}`;

    // Generar enlace de WhatsApp según la cantidad de productos
    let whatsappMessage = generarMensajeWhatsApp();
    if (whatsappMessage) {
        cartFooter.innerHTML = `
            <p>Total: <span id="cart-total">S/ ${total.toFixed(2)}</span></p>
            <a href="${whatsappMessage}" target="_blank">
                <button class="whatsapp-button">📲 Pedir por WhatsApp</button>
            </a>
            <button onclick="toggleCart()">Cerrar</button>
        `;
    }
}

// Función para generar el mensaje de WhatsApp
function generarMensajeWhatsApp() {
    if (cart.length === 0) return "";

    let phoneNumber = "51940505969"; // Cambia esto por el número real de WhatsApp
    let message = "Hola, quiero hacer un pedido:\n\n";

    cart.forEach(item => {
        message += `🛒 ${item.quantity}x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\n💰 Total: S/ ${total.toFixed(2)}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Cambiar cantidad de productos en el carrito
function updateQuantity(name, quantity) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCart();
    }
}

// Mostrar/ocultar carrito
function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
}

// Finalizar compra
function finalizarCompra() {
    alert("¡Pedido realizado con éxito!");
    cart = [];
    updateCart();
    toggleCart();
}
