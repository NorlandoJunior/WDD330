// Seleciona todos os botões de wishlist
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

// Recupera a wishlist do localStorage ou cria um array vazio
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Inicializa os botões já ativos
wishlistButtons.forEach(btn => {
  const product = btn.closest('li').dataset.product;
  if (wishlist.includes(product)) {
    btn.classList.add('active');
    btn.textContent = '❤️';
  }

  // Evento de clique
  btn.addEventListener('click', () => {
    toggleWishlist(product, btn);
  });
});

function toggleWishlist(product, btn) {
  if (wishlist.includes(product)) {
    // Remove do array
    wishlist = wishlist.filter(item => item !== product);
    btn.classList.remove('active');
    btn.textContent = '♡';
  } else {
    // Adiciona ao array
    wishlist.push(product);
    btn.classList.add('active');
    btn.textContent = '❤️';
  }
  // Salva no localStorage
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
