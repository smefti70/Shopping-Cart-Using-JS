let cart = [];
const promoCodes = {
    "ostad10": 0.10,
    "ostad5": 0.05
};
let appliedPromoCode = null;

// Add item to cart
function addToCart(id, name, price, image) {
    id = Number(id);
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update item quantity
function updateQuantity(id, quantity) {
    let item = cart.find(product => product.id === id);
    quantity = Math.max(1, parseInt(quantity) || 1);
    if (item) {
        item.quantity = quantity;
    }
    updateCart();
}

// Clear the cart
function clearCart() {
    cart = [];
    appliedPromoCode = null; // Reset promo code on cart clear
    document.getElementById("promo-code").value = "";
    document.getElementById("promo-message").textContent = "";
    updateCart();
}

// Update cart UI and apply discounts
function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let subtotalElement = document.getElementById("cart-subtotal");
    let subtotalContainer = document.getElementById("cart-subtotal-container");
    let discountContainer = document.getElementById("cart-discount-container");
    let totalContainer = document.getElementById("cart-total-container");
    let promoContainer = document.getElementById("promo-code-cotainer");
    let discountElement = document.getElementById("cart-discount");
    let totalElement = document.getElementById("cart-total");
    let clearCartButton = document.getElementById("clear-cart");

    cartContainer.innerHTML = ""; // Clear previous items
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        subtotalElement.textContent = "0.00";  
        discountElement.textContent = "0.00";  
        totalElement.textContent = "0.00";  
        clearCartButton.style.display = 'none';
        subtotalContainer.style.display = 'none';
        totalContainer.style.display = 'none';
        discountContainer.style.display = 'none';
        promoContainer.style.display = 'none';
    } else {
        subtotalContainer.style.display = 'block';
        totalContainer.style.display = 'block';
        discountContainer.style.display = 'block';
        promoContainer.style.display = 'block';
        clearCartButton.style.display = 'block';

        cart.forEach(item => {
            subtotal += item.price * item.quantity;

            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="cart-item-row">
                    <div class="cart-item-top">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity(${item.id})">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQuantity(${item.id})">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        // Apply discount if a promo code is active
        let discount = appliedPromoCode && promoCodes[appliedPromoCode] ? subtotal * promoCodes[appliedPromoCode] : 0;
        let total = subtotal - discount;

        // ✅ Fixing duplicate text by setting only the value, not appending
        subtotalElement.textContent = subtotal.toFixed(2);
        discountElement.textContent = discount.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    updateCartCount();
    saveCart();
}


// Apply Promo Code
function applyPromoCode() {
    const promoInput = document.getElementById("promo-code").value.trim();
    const promoMessage = document.getElementById("promo-message");

    if (promoCodes[promoInput]) {
        if (appliedPromoCode === promoInput) {
            promoMessage.textContent = "Promo code already applied!";
            promoMessage.style.color = "orange";
        } else {
            appliedPromoCode = promoInput;
            promoMessage.textContent = "Promo code applied successfully!";
            promoMessage.style.color = "green";
            updateCart();
        }
    } else {
        promoMessage.textContent = "Invalid promo code!";
        promoMessage.style.color = "red";
        appliedPromoCode = null;
        updateCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart();
}

// Call loadCart() when the page loads
document.addEventListener("DOMContentLoaded", loadCart);

// Update cart item count in the navbar
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
}

// Increase quantity of an item
function increaseQuantity(id) {
    let item = cart.find(product => product.id === id);
    if (item) {
        item.quantity++;
    }
    updateCart();
}

// Decrease quantity of an item or remove if quantity is 0
function decreaseQuantity(id) {
    let item = cart.find(product => product.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(product => product.id !== id);
    }
    updateCart();
}
