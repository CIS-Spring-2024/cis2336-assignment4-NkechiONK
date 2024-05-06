document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.content h3')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)),
                quantity: 1,
            };

            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
            if (existingItemIndex !== -1) {
                if (cartItems[existingItemIndex].quantity < 10) {
                    cartItems[existingItemIndex].quantity++;
                } else {
                    alert("Quantity cannot be more than 10.");
                }
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemsCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <button class="minus-btn" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="add-btn" data-index="${index}">+</button>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}"><i class="fas fa-times"></i></button>
                `;

            cartItemsList.appendChild(cartItem);
        });

        // Event listeners for removing, incrementing, and decrementing items are added here
    }

    function updateCartTotal() {
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    checkoutBtn.addEventListener('click', () => {
        // Calculate total cost
        const totalCost = totalAmount.toFixed(2);

        // Redirect to the confirmation page with total cost as query parameter
        window.location.href = `/confirmation?totalAmount=${totalCost}`;
    });
});