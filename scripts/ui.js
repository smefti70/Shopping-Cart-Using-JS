// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    loadCart(); // Load cart data from storage
    document.getElementById("clear-cart").addEventListener("click", () => {
        clearCart();  // Clear the cart when the 'Clear Cart' button is clicked
        saveCart();   // Save the updated cart state
    });
});

// Function to render the cart items and update the total and count
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = ""; // Clear the cart container before updating
    let total = 0;
    let count = 0;

    // Check if the cart is empty or has items
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    } else {
        // Loop through each cart item and display it
        cart.forEach(item => {
            total += item.price * item.quantity; // Update total price
            count += item.quantity; // Update item count

            const cartItem = document.createElement("div");
            cartItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

            // Add cart item details to the item container
            cartItem.innerHTML = `
                <div>
                    <strong>${item.name}</strong> - $${item.price} x 
                    <input type="number" value="${item.quantity}" min="1" class="cart-quantity" style="width: 50px;" 
                        onchange="updateQuantity(${item.id}, this.value)">
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItem); // Append the cart item to the cart container
        });
    }

    // Update the cart count and total price
    cartCount.innerText = count;
    cartTotal.innerText = total.toFixed(2); // Format the total price to 2 decimal places
}
