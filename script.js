// Product information stored in JavaScript objects
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1299,
        icon: "🎧",
        description: "Enjoy music with clear sound."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        icon: "⌚",
        description: "A smart companion for your day."
    },
    {
        id: 3,
        name: "Backpack",
        price: 899,
        icon: "🎒",
        description: "A stylish bag for everyday use."
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 1599,
        icon: "👟",
        description: "Comfortable shoes for daily activities."
    },
    {
        id: 5,
        name: "Coffee Mug",
        price: 299,
        icon: "☕",
        description: "Enjoy your favourite hot drink."
    },
    {
        id: 6,
        name: "Sunglasses",
        price: 699,
        icon: "🕶️",
        description: "A classic accessory for sunny days."
    }
];

let cart = [];

// Get HTML elements
const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSection = document.getElementById("cart-section");
const modal = document.getElementById("checkout-modal");
const checkoutDetails = document.getElementById("checkout-details");

// Display products dynamically
function displayProducts() {
    productsContainer.innerHTML = "";

    products.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="product-price">₹${product.price}</p>
            <button class="add-btn" data-id="${product.id}">
                Add to Cart
            </button>
        `;

        productsContainer.appendChild(card);
    });
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find(function(item) {
        return item.id === productId;
    });

    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    updateCart();
}

// Calculate item count and total price
function updateCart() {
    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <div>
                <strong>${item.icon} ${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>
            <button data-remove="${item.id}">Remove</button>
        `;

        cartItems.appendChild(row);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty. Add a product to begin!</p>";
    }

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// Show checkout preview modal
function showCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add a product first.");
        return;
    }

    let totalPrice = 0;
    let summary = "<h3>Order Summary</h3>";

    cart.forEach(function(item) {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        summary += `
            <p>${item.name} × ${item.quantity} — ₹${itemTotal}</p>
        `;
    });

    summary += `<hr><p><strong>Total: ₹${totalPrice}</strong></p>`;

    checkoutDetails.innerHTML = summary;
    modal.style.display = "flex";
}

// Product button clicks
productsContainer.addEventListener("click", function(event) {
    const button = event.target.closest("[data-id]");

    if (button) {
        addToCart(Number(button.dataset.id));
    }
});

// Remove button clicks
cartItems.addEventListener("click", function(event) {
    const button = event.target.closest("[data-remove]");

    if (button) {
        removeFromCart(Number(button.dataset.remove));
    }
});

// Open cart section
document.getElementById("view-cart").addEventListener("click", function() {
    cartSection.scrollIntoView({
        behavior: "smooth"
    });
});

// Open checkout modal
document.getElementById("checkout-btn").addEventListener("click", showCheckout);

// Close modal
document.getElementById("close-modal").addEventListener("click", function() {
    modal.style.display = "none";
});

// Close modal by clicking outside it
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Confirm demo order
document.getElementById("confirm-btn").addEventListener("click", function() {
    alert("Demo order confirmed! Thank you for shopping with ShopEase.");
    cart = [];
    updateCart();
    modal.style.display = "none";
});

// Initial setup
displayProducts();
updateCart();