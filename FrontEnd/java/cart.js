document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log('Cart Items:', cartItems); // Debug: Log cart items to console

    // Select the cart container element
    const cartContainer = document.querySelector('.cart-container');
    console.log('Cart Container:', cartContainer); // Debug: Log cart container to console

    if (cartItems && cartItems.length > 0) {
        // If cart items exist and are not empty, display them in the cart container
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.name}</span>
                <span>Quantity: ${item.quantity}</span>
                <span>Total: $${item.price * item.quantity}</span>
            `;
            cartContainer.appendChild(cartItemElement);
        });

        // Calculate and display the total amount
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalAmountElement = document.createElement('div');
        totalAmountElement.classList.add('total-amount');
        totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
        cartContainer.appendChild(totalAmountElement);
    } else {
        // If cart is empty, display a message
        const emptyCartMessage = document.createElement('div');
        emptyCartMessage.textContent = 'Your cart is empty';
        cartContainer.appendChild(emptyCartMessage);
    }
});