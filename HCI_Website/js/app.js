let cart = [];

function addToCart(button) {
    const item = button.closest('.drink-items');
    const name = item.getAttribute('data-name');
    const price = parseInt(item.getAttribute('data-price'));

    const cartItem = cart.find(cartItem => cartItem.name === name);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(name) {
    const cartItem = cart.find(cartItem => cartItem.name === name);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
            cart = cart.filter(cartItem => cartItem.name !== name);
        }
    }
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartNav = document.getElementById('cart-nav');

    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');
        itemInfo.textContent = `${item.name} - Php${item.price} x ${item.quantity}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.onclick = () => addToCartFromCart(item.name);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = () => removeFromCart(item.name);
        
        li.appendChild(itemInfo);
        li.appendChild(addButton);
        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    if (cart.length > 0) {
        cartNav.classList.remove('hidden');
    } else {
        cartNav.classList.add('hidden');
    }
}

function addToCartFromCart(name) {
    const cartItem = cart.find(cartItem => cartItem.name === name);
    if (cartItem) {
        cartItem.quantity += 1;
        updateCart();
    }
}

function generateReceipt() {
    const receiptDiv = document.getElementById('receipt');
    if (cart.length === 0) {
        receiptDiv.innerHTML = '<p>No items to display.</p>';
    } else {
        let total = 0;
        const items = cart.map(cartItem => {
            total += cartItem.price * cartItem.quantity;
            return `<li>${cartItem.name} - Php${(cartItem.price * cartItem.quantity).toFixed(2)} x ${cartItem.quantity}</li>`;
        }).join('');
        receiptDiv.innerHTML = `<ul>${items}</ul><p>Total: Php${total.toFixed(2)}</p>`;
    }
    showModal();
}

function closeModal() {
    const modal = document.getElementById('receipt-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
}

document.getElementById('checkout-button').addEventListener('click', generateReceipt);


function showModal() {
    const modal = document.getElementById('receipt-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('receipt-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
}

document.getElementById('checkout-button').addEventListener('click', generateReceipt);
function clearCart() {
    cart = []; 
    updateCart(); 
}


document.getElementById('clear-cart-button').addEventListener('click', clearCart);
