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
           <div class="checkout-item">
                <span>${item.name} - €${item.price}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        total += item.price;
    });

    document.getElementById("order-total").innerText = total.toFixed(2);
}

// Remove item from cart
function removeItem(index) {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    savedCart.splice(index, 1); // remove item
    localStorage.setItem("cart", JSON.stringify(savedCart));

    loadCheckout(); // reload updated list
}

// ⭐ FULL VALIDATION ADDED HERE ⭐
function placeOrder() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let payment = document.getElementById("payment").value;

    // Validate name
    if (name.length < 3) {
        alert("Please enter your full name.");
        return;
    }

    // Validate email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate phone number (numbers only, 8–15 digits)
    let phonePattern = /^[0-9]{8,15}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number (numbers only, 8–15 digits).");
        return;
    }

    // Validate address
    if (address.length < 5) {
        alert("Please enter a valid delivery address.");
        return;
    }

    // Validate cart is not empty
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // If everything is valid
    alert(
        "Order placed successfully!\n\n" +
        "Thank you, " + name + ".\n" +
        "Your items will be delivered to:\n" + address
    );

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to home page
    window.location.href = "index.html";
}

// Auto-load checkout page
window.onload = function() {
    if (document.getElementById("order-items")) {
        loadCheckout();
    }
};
