// cart.js
import { getLocalStorage, setLocalStorage } from './utils.mjs';

// Função para renderizar o carrinho na página
function renderCart() {
  const cartList = document.querySelector('.product-list');
  cartList.innerHTML = ''; // limpa a lista antes de renderizar

  const cart = getLocalStorage('cart') || [];

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-card divider';
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-card__img">
      <h2 class="card__name">${item.name}</h2>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.price.toFixed(2)}</p>
    `;
    cartList.appendChild(li);
  });
}

// Função para adicionar item ao carrinho
export function addToCart(product) {
  const cart = getLocalStorage('cart') || [];
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  setLocalStorage('cart', cart);
  renderCart();
}

// Detecta todos os botões "Add to Cart"
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      image: button.dataset.image || ""
    };

    addToCart(product);
  });
});

// Inicializa a página do carrinho
renderCart();
