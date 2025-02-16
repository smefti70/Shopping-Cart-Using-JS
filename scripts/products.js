// Wait until the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Fetch product data from the products.json file
    fetch("products.json")
        .then(response => response.json()) // Parse the JSON response
        .then(products => displayProducts(products)) // Display products once the data is loaded
        .catch(error => console.error("Error loading products:", error)); // Log errors if the fetch fails
});

// Function to display products on the page
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear the product list before adding new products

    // Create a product card for each product in the fetched data
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product"); // Add the 'product' class to style the card
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h5>${product.title}</h5>
            <p class="product-details">${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        productList.appendChild(productCard); // Add the product card to the page
    });
}
