// Load cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

// Load items on checkout page
function loadCheckout() {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("order-items");
    let total = 0;

    container.innerHTML = ""; // clear before loading

    savedCart.forEach((item, index) => {
        container.innerHTML += `
            <p>
                ${item.name} - €${item.price}
                <button onclick="removeItem(${index})">Remove</button>
            </p>
        `;
        total += item.price;
    });

    document.getElementById("order-total").innerText = total;
}

// Remove item from cart
function removeItem(index) {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    savedCart.splice(index, 1); // remove item
    localStorage.setItem("cart", JSON.stringify(savedCart));

    loadCheckout(); // reload updated list
}

// Place order
function placeOrder() {
    alert("Thank you! Your order has been placed.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// Auto-load checkout page
window.onload = function() {
    if (document.getElementById("order-items")) {
        loadCheckout();
    }
};
