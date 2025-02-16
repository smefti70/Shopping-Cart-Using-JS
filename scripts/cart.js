let cart = [];

// Add item to cart
function addToCart(id, name, price, image) {
    id = Number(id);  // Ensure ID is a number
    let item = cart.find(product => product.id === id);

    // If item exists, increment quantity, otherwise add it to the cart
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
    cart = cart.filter(item => item.id !== id);  // Filter out the item with the given ID
    updateCart();
}

// Update item quantity
function updateQuantity(id, quantity) {
    let item = cart.find(product => product.id === id);
    quantity = Math.max(1, parseInt(quantity) || 1); // Ensure valid quantity
    if (item) {
        item.quantity = quantity;  // Update item quantity
    }
    updateCart();
}

// Clear the cart
function clearCart() {
    cart = [];  // Reset the cart to an empty array
    updateCart();
}

// Render cart items and update UI
function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total-container");
    let clearCartButton = document.getElementById("clear-cart");
    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        totalContainer.style.display = 'none';  // Hide total
        clearCartButton.style.display = 'none'; // Hide clear cart button
    } else {
        totalContainer.style.display = 'block';  // Show total
        clearCartButton.style.display = 'block'; // Show clear cart button
        
        cart.forEach(item => {
            total += item.price * item.quantity;  // Calculate total price

            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="cart-item-row">
                    <div class="cart-item-top">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price}</p>
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

            cartContainer.appendChild(cartItem);  // Append the item to the cart container
        });

        // Update the total price
        totalContainer.style.display = 'block'; // Ensure it is visible
        document.getElementById("cart-total").innerText = total.toFixed(2);  // Update the displayed total
    }

    updateCartCount();  // Update the cart item count
    saveCart();  // Save the cart state to localStorage

    // Show checkout button if there are items in the cart
    if (cart.length > 0) {
        let checkoutBtn = document.createElement("div");
        checkoutBtn.innerHTML = `
            <button id="checkout-btn" class="btn btn-warning w-100 mt-3">Proceed to Payment</button>
        `;
        cartContainer.appendChild(checkoutBtn);
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
    
    // Sum all quantities in the cart
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update the count in the navbar
    cartCount.innerText = totalItems;
}

// Increase quantity of an item
function increaseQuantity(id) {
    let item = cart.find(product => product.id === id);
    if (item) {
        item.quantity++;  // Increase quantity by 1
    }
    updateCart();
}

// Decrease quantity of an item or remove if quantity is 0
function decreaseQuantity(id) {
    let item = cart.find(product => product.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;  // Decrease quantity by 1
    } else {
        cart = cart.filter(product => product.id !== id);  // Remove item if quantity is 0
    }
    updateCart();
}
