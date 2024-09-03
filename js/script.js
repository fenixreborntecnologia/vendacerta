document.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        btn.style.setProperty('--eixoX', x + 'px');
        btn.style.setProperty('--eixoY', y + 'px');
    });
});


var msgCookies = document.getElementById('cookies-msg')

function aceito(){
    localStorage.lgpd = "sim"
    msgCookies.classList.remove('mostrar')
}

if(localStorage.lgpd == 'sim'){
    msgCookies.classList.remove('mostrar')
}

else{
    msgCookies.classList.add('mostrar')
}


const sobreNosBtn = document.getElementById('sobreNosBtn');
const produtosBtn = document.getElementById('produtosBtn');
const sobreNosSection = document.getElementById('sobreNos');
const produtosSection = document.getElementById('produto');

function mostrarSecao(secaoMostrar, secaoOcultar) {
    secaoOcultar.classList.remove('active');
    secaoMostrar.classList.add('active');
    secaoOcultar.classList.add('section');
    secaoMostrar.classList.remove('section');
}

sobreNosBtn.addEventListener('click', () => {
    mostrarSecao(sobreNosSection, produtosSection);
});

produtosBtn.addEventListener('click', () => {
    mostrarSecao(produtosSection, sobreNosSection);
});


let cart = [];
let totalPrice = 0;

function addToCart(productName, productPrice, productImage) {

    const cartItem = document.createElement('li');

    const img = document.createElement('img');
    img.src = productImage;
    img.alt = productName;
    cartItem.appendChild(img);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = '1';
    quantityInput.classList.add('quantity-input');
    quantityInput.onchange = function() {
        updateCartItemPrice(cartItem, productPrice, parseInt(quantityInput.value));
    };
    cartItem.appendChild(quantityInput);

    const productDetails = document.createElement('span');
    productDetails.innerText = `${productName} - R$${productPrice.toFixed(2)}`;
    cartItem.appendChild(productDetails);

    const deleteButton = document.createElement('img');
    deleteButton.src = 'img/lixo.png';  
    deleteButton.alt = 'Excluir';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        cartItem.remove();
        totalPrice -= productPrice * parseInt(quantityInput.value);
        updateTotalPrice();
    };
    cartItem.appendChild(deleteButton);

    document.getElementById('cartItems').appendChild(cartItem);

    updateCartItemPrice(cartItem, productPrice, parseInt(quantityInput.value));
}

function updateCartItemPrice(cartItem, productPrice, quantity) {
    const productDetails = cartItem.querySelector('span');
    const totalItemPrice = productPrice * quantity;

    productDetails.innerText = `${cartItem.querySelector('img').alt} - R$${totalItemPrice.toFixed(2)}`;

    updateTotalPrice();
}

function updateTotalPrice() {
    totalPrice = 0;
    const cartItems = document.getElementById('cartItems').querySelectorAll('li');

    cartItems.forEach((item) => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const priceText = item.querySelector('span').innerText.split('- R$')[1];
        const price = parseFloat(priceText);
        totalPrice += price;
    });

    document.getElementById('totalPrice').innerText = `Total: R$${totalPrice.toFixed(2)}`;
}

function openModal() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}


function goToPayment() {
    closeModal(); 
    openPaymentModal(); 
}

function openModal() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function openPaymentModal() {
    updateOrderSummary();  
    document.getElementById('paymentModal').style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const paymentTotalPrice = document.getElementById('paymentTotalPrice');

    orderSummary.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (x${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}`;
        orderSummary.appendChild(li);
    });

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    paymentTotalPrice.textContent = `Total: R$${totalPrice.toFixed(2)}`;
}
